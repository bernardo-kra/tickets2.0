import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "./TicketDetails.css"
import { myRoutes } from "../../routes/routes"

function TicketDetails() {
    const { id } = useParams()
    const [ticket, setTicket] = useState({})
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios
            .get(`${myRoutes.routeBody}${myRoutes.routeTicketsId(id)}`, { headers: { Authorization: `${token}` } })
            .then((response) => {
                const ticketData = response.data
                if (typeof ticketData.sector === 'string') {
                    ticketData.sector = JSON.parse(ticketData.sector)
                }
                setTicket(ticketData)
            })
            .catch((err) => console.error(err))
    }, [id])

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const hour = date.getHours()
        const minute = date.getMinutes()
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month
            }/${year} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`
    }

    return (
        <div className="ticket-details-container">
            <div className="ticket-header">
                <h1>{ticket.eventName}</h1>
                <p>
                    {formatDate(ticket.startAt)} - {formatDate(ticket.endAt)}
                </p>
            </div>
            <div className="ticket-info">
                <p>
                    <strong>Local:</strong> {ticket.location}
                </p>
            </div>
            <div className="ticket-description-card">
                <h2>Descrição</h2>
                <p>{ticket.details}</p>
            </div>
            <div className="ticket-location-card">
                <h2>Local</h2>
                <p>{ticket.location}</p>
            </div>
            <div className="ticket-sectors-container">
                <h2>Ingressos</h2>
                <div className="ticket-sectors">
                    {ticket.sector && ticket.sector.map((sector, index) => (
                        <div key={index} className="ticket-sector-card">
                            <h3>{sector.name}</h3>
                            <p>Preço: R$: {sector.value}</p>
                            <button className="ticket-buy-button">Comprar</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TicketDetails
