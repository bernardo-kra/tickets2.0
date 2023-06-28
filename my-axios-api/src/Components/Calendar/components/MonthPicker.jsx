import React from "react"
import "./MonthPicker.css"

const MonthPicker = ({ currentMonth, onMonthChange }) => {
    const handlePrevMonth = () => {
        const newMonth = currentMonth.getMonth() - 1
        onMonthChange(newMonth)
    }

    const handleNextMonth = () => {
        const newMonth = currentMonth.getMonth() + 1
        onMonthChange(newMonth)
    }

    return (
        <div className="month-picker">
            <button className="not-selectable" onClick={handlePrevMonth}>{"<"}</button>
            <span className="not-selectable">{`${currentMonth.toLocaleString("default", { month: "long" })} ${currentMonth.getFullYear()}`}</span>
            <button className= "not-selectable" onClick={handleNextMonth}>{">"}</button>
        </div>
    )
}

export default MonthPicker
