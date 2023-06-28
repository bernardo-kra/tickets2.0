import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import "./MyTickets.css"
import { myRoutes } from "../../routes/routes"
import { AuthContext } from "../../auth/AuthProvider"

function MyTickets() {
    const [tickets, setTickets] = useState([])
    const { user, role } = useContext(AuthContext)
    const token = localStorage.getItem('token')

    const fetchTickets = async () => {
        try {
            const response = await axios.get(`${myRoutes.routeBody}${myRoutes.routeMyTickets}`, {
                headers: { Authorization: `${token}` },
            })
            setTickets(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchTickets()
    }, [])

    return (
        <div className="my-tickets-container">
            <h1>My Tickets</h1>
            {tickets.map((ticket, index) => (
                <div className="my-tickets-card" key={index}>
                    <h2 className="my-tickets-title" title={ticket.eventName}>
                        {ticket.eventName}
                    </h2>
                    <p className="my-tickets-date">Date: {ticket.date}</p>
                    {role === 'client' && ticket.creatorId == user && (
                        <a className="my-tickets-link" href={`${myRoutes.routeMyTicketsId(ticket.id)}`}>
                            See more details
                        </a>
                    )}
                    {role === 'admin' && (
                        <>
                            <a className="my-tickets-link" href={`${myRoutes.routeMyTicketsId(ticket.id)}`}>
                                See more details
                            </a>
                            {ticket.creatorId !== user.id && (
                                <>
                                    <p className="admin-permission-notice">ADMIN PERMISSION</p>
                                    <p>User: {ticket.creatorId}</p>
                                </>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    )

}

export default MyTickets
