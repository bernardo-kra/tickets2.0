import React, { useContext } from "react"
import { AuthContext, } from "../../auth/AuthProvider"
import { useRegisterTickets } from "./hooks"
import './FormTickets.css'

const TicketForm = () => {

    const { user } = useContext(AuthContext)

    const {
        handleSubmit,
        handleSectorChange,
        handleAddSector,
        handleRemoveSector,
        eventName,
        location,
        date,
        details,
        contact,
        startAt,
        endAt,
        creatorId = creatorId.setValue(user),
        sector } = useRegisterTickets()

    return (
        <form className="form-tickets not-selectable" onSubmit={handleSubmit}>
            <div className="form-tickets-container">
                <div className="form-tickets-column">
                    <label >
                        Nome do evento:
                        <input
                            type="text"
                            value={eventName.value}
                            onChange={(e) => eventName.setValue(e.target.value)}
                        />
                    </label>
                    <label>
                        Localização:
                        <input
                            type="text"
                            value={location.value}
                            onChange={(e) => location.setValue(e.target.value)}
                        />
                    </label>
                    <label>
                        Data:
                        <input
                            type="date"
                            value={date.value}
                            onChange={(e) => date.setValue(e.target.value)}
                        />
                    </label>
                    <label>
                        Detalhes:
                        <textarea
                            maxLength="3000"
                            value={details.value}
                            onChange={(e) => details.setValue(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-tickets-column">
                    <label>
                        Contato:
                        <input
                            id="myInput"
                            type="text"
                            value={contact.value}
                            onChange={(e) => contact.setValue(e.target.value)}
                        />
                    </label>
                    <label>
                        Data/Hora Inicio:
                        <input
                            type="datetime-local"
                            value={startAt.value}
                            onChange={(e) => startAt.setValue(e.target.value)}
                        />
                    </label>
                    <label>
                        Data/Hora Fim:
                        <input
                            type="datetime-local"
                            value={endAt.value}
                            onChange={(e) => endAt.setValue(e.target.value)}
                        />
                    </label>
                    <label>
                        Id do Criador:
                        <input
                            title={user}
                            type="text"
                            value={user}
                            disabled
                            className="not-selectable"
                        />
                    </label>
                </div>
            </div>
            {sector.value.map((sectorItem, index) => (
                <div className="not-selectable" key={index}>
                    <div className="tickets-section-header">
                        <h3>Sector {index + 1}</h3>
                        <button onClick={(event) => handleRemoveSector(event, index)}>Remover Setor</button>
                    </div>
                    <div className='tickets-form-sector'>
                        <label htmlFor={`sector-${index}-name`}>Nome:</label>
                        <input
                            id={`sector-${index}-name`}
                            name={`sector-${index}-name`}
                            type="text"
                            value={sectorItem.name}
                            onChange={(event) => handleSectorChange(index, 'name', event.target.value)}
                        />
                    </div>
                    <div className='tickets-form-sector'>
                        <label htmlFor={`sector-${index}-quantity`}>Quantidade:</label>
                        <input
                            id={`sector-${index}-quantity`}
                            name={`sector-${index}-quantity`}
                            type="number"
                            value={sectorItem.quantity}
                            onChange={(event) => handleSectorChange(index, 'quantity', event.target.value)}
                        />
                    </div>
                    <div className='tickets-form-sector'>
                        <label htmlFor={`sector-${index}-value`}>Valor:</label>
                        <input
                            id={`sector-${index}-value`}
                            name={`sector-${index}-value`}
                            type="number"
                            value={sectorItem.value}
                            onChange={(event) => handleSectorChange(index, 'value', event.target.value)}
                        />
                    </div>
                </div>
            ))}
            <button onClick={handleAddSector}>Adicionar Setor</button>
            <button className="tickets-button-submit" type="submit">Criar evento</button>
        </form>
    )
}

export default TicketForm
