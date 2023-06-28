import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import MonthPicker from "./components/MonthPicker"
import "./Calendar.css"
import axios from 'axios'
import { myRoutes } from "../routes/routes"

const API_URL = `${myRoutes.routeBody}${myRoutes.routeTickets}`

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        fetchTickets()
    }, [currentMonth])

    const fetchTickets = async () => {
        const response = await axios.get(API_URL)
        setTickets(response.data)
    }

    const handleMonthChange = month => {
        const newMonth = new Date(currentMonth)
        newMonth.setMonth(month)
        setCurrentMonth(newMonth)
    }

    const getDaysInMonth = () => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()
        return new Date(year, month + 1, 0).getDate()
    }

    const daysInMonth = getDaysInMonth()
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
    const weeks = []
    let week = []

    for (let i = 0;i < firstDayOfMonth;i++) {
        week.push(<td key={`empty-${i}`} className="empty"></td>);
    }

    for (let day = 1;day <= daysInMonth;day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toLocaleDateString('pt-BR')
        const cards = tickets.filter(ticket => {
            const ticketDate = new Date(ticket.date)
            return ticketDate.toLocaleDateString('pt-BR') === date && ticket.isVisible === 1
        }).map(ticket => (
            <Link key={ticket.id} to={`/tickets/${ticket.id}`} className="card">
                <div className="card-content">
                    <h4 title={ticket.eventName}>{ticket.eventName}</h4>
                </div>
            </Link>
        ))

        week.push(
            <td key={`day-${day}`} className="day not-selectable">
                <span>{day}</span>
                {cards.length > 0 ? <div className="card-container">{cards}</div> : null}
            </td>
        )

        if (week.length === 7 || day === daysInMonth) {
            weeks.push(<tr key={`week-${weeks.length}`}>{week}</tr>)
            week = []
        }
    }

    return (
        <div className="calendar-container">
            <div className="calendar">
                <MonthPicker currentMonth={currentMonth} onMonthChange={handleMonthChange} />
                <table>
                    <thead>
                        <tr className="calendar-header not-selectable">
                            <th>D</th>
                            <th>S</th>
                            <th>T</th>
                            <th>Q</th>
                            <th>Q</th>
                            <th>S</th>
                            <th>S</th>
                        </tr>
                    </thead>
                    <tbody>{weeks}</tbody>
                </table>
            </div>
        </div>

    )
}

export default Calendar
