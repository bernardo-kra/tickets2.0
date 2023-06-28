const pool = require('./dbConnection'); 

const createTables = async () => {
  const createUserTable = `
    CREATE TABLE IF NOT EXISTS user (
      id INT PRIMARY KEY AUTO_INCREMENT,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
      role ENUM('admin', 'client', 'buyer') NOT NULL DEFAULT 'buyer'
    );`;

  const createTicketsTable = `
    CREATE TABLE IF NOT EXISTS tickets (
      id INT PRIMARY KEY AUTO_INCREMENT,
      eventName VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      date VARCHAR(255) NOT NULL,
      details VARCHAR(255) NOT NULL,
      contact VARCHAR(255) NOT NULL,
      startAt VARCHAR(255) NOT NULL,
      endAt VARCHAR(255) NOT NULL,
      creatorId INT,
      sector VARCHAR(255),
      isVisible BOOLEAN NOT NULL DEFAULT TRUE,
      FOREIGN KEY (creatorId) REFERENCES user(id)
    );`;

  const connection = await pool.getConnection()

  try {
    await connection.query(createUserTable)
    await connection.query(createTicketsTable)
  } catch (error) {
    console.error(error)
  } finally {
    connection.release()
  }
}

module.exports = createTables
