require('dotenv/config')
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const listRoutes = require('express-list-routes')

const pool = require('./dbConnections/dbConnection')
const createTables = require('./dbConnections/dbSetup')

const app = express()
app.use(cors())
app.use(express.json())

createTables()

const verificarToken = (req, res, next) => {
    const removeBearer = (token) => {
      const pattern = /bearer /gi;
      const hasBearer = pattern.test(token);
      if (hasBearer) {
        return token.replace(pattern, '');
      }
      return token;
    };
  
    const token = removeBearer(req.header('Authorization'));
  
    if (!token) {
      return res.status(401).json({ mensagem: 'Access token not provided' });
    }
  
    jwt.verify(token, process.env.TOKEN_SIGNATURE, (err, decoded) => {
      if (err) {
        return res.status(401).json({ mensagem: 'Invalid access token' });
      }
  
      const { role } = decoded;
      if (!['admin', 'client', 'buyer'].includes(role)) {


        return res.status(403).json({ mensagem: 'Invalid user role' });
      }
  
      req.user = decoded;
      next();
    });
  };
  



app.post('/user', async (req, res) => {
    const { firstName, lastName, email, phone, password, role } = req.body;

    try {
        const connection = await pool.getConnection();
        const [existingUsers] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Usuario ja cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.query('INSERT INTO user (firstName, lastName, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)', [firstName, lastName, email, phone, hashedPassword, role]);

        res.json({ message: 'User created successfully' });
        connection.release();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get("/user", async (req, res) => {
    res.send(req.body)
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const connection = await pool.getConnection()

        const [users] = await connection.query('SELECT * FROM user WHERE email = ?', [email])
        const user = users[0]

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ mensagem: 'Invalid credentials' })
        }
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.TOKEN_SIGNATURE, { expiresIn: '3h' })

        return res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                nome: user.nome,
                role: user.role
            },
        })
        if (connection) connection.release()

    } catch (err) {
        console.error(err)
        return res.status(500).json({ mensagem: 'Internal server error' })
    }
})


app.post('/create-tickets', verificarToken, async (req, res) => {
    const { eventName, location, date, details, contact, startAt, endAt } = req.body
    const creatorId = req.user.id
    const sector = req.body.sector

    try {
        const connection = await pool.getConnection()

        const sectorString = JSON.stringify(sector);

        await connection.query('INSERT INTO tickets (eventName, location, date, details, contact, startAt, endAt, creatorId, sector) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [eventName, location, date, details, contact, startAt, endAt, creatorId, sectorString]);

        res.json({ message: 'Ticket created successfully' })
        connection.release()
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
})


app.put('/update/:id', verificarToken, async (req, res) => {
    const ticketId = req.params.id;
    const { eventName, location, date, details, contact, startAt, endAt, sector, isVisible } = req.body;
    const userId = req.user.id;

    try {
        const connection = await pool.getConnection();
        const [tickets] = await connection.query('SELECT * FROM tickets WHERE id = ?', [ticketId]);
        const ticket = tickets[0];

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (req.user.role === 'client' && ticket.creatorId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this ticket' });
        } else if (req.user.role === 'buyer') {
            return res.status(403).json({ message: 'Buyers are not authorized to update tickets' });
        }

        await connection.query(
            'UPDATE tickets SET eventName = ?, location = ?, date = ?, details = ?, contact = ?, startAt = ?, endAt = ?, sector = ?, isVisible = ? WHERE id = ?',
            [eventName, location, date, details, contact, startAt, endAt, sector, isVisible, ticketId]
        );

        res.json({ message: `Ticket updated: ${ticketId}` });
        connection.release();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




app.get('/tickets', async (req, res) => {
    try {
        const connection = await pool.getConnection()

        const [tickets] = await connection.query('SELECT * FROM tickets')

        res.json(tickets)
        connection.release()
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

app.get('/my-tickets', verificarToken, async (req, res) => {
    const userRole = req.user.role;
    const userId = req.user.id;

    try {
        const connection = await pool.getConnection();

        if (userRole === 'admin') {
            const [tickets] = await connection.query('SELECT * FROM tickets');
            res.json(tickets);
        } else if (userRole === 'client') {
            const [tickets] = await connection.query('SELECT * FROM tickets WHERE creatorId = ?', [userId]);
            res.json(tickets);
        } else {
            res.status(403).json({ message: 'Buyer does not have access' });
        }

        connection.release();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/my-tickets/:id', verificarToken, async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await pool.getConnection();
        let ticket;
        if (req.user.role === 'admin') {
            const [tickets] = await connection.query('SELECT * FROM tickets WHERE id = ?', [id]);
            ticket = tickets[0];
        } else if (req.user.role === 'client') {
            const [tickets] = await connection.query('SELECT * FROM tickets WHERE id = ? AND creatorId = ?', [id, req.user.id]);
            ticket = tickets[0];
        } else if (req.user.role === 'buyer') {
            return res.status(403).json({ error: 'You do not have permission to access this ticket' });
        } else {
            return res.status(400).json({ error: 'Invalid user role' });
        }

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        return res.json(ticket);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Server error' });
    }
});


app.get('/tickets/:id', async (req, res) => {
    const { id } = req.params

    try {
        const connection = await pool.getConnection()

        const [tickets] = await connection.query('SELECT * FROM tickets WHERE id = ?', [id])
        const ticket = tickets[0]

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' })
        }
        return res.json(ticket)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Server error' })
    }
})


app.get('/protect', verificarToken, (req, res) => {
    return res.status(200).json({ mensagem: 'Access allowed', user: req.user })
})

listRoutes(app)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
