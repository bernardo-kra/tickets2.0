import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRegisterTickets } from "../formTickets/hooks"
import "../formTickets/FormTickets.css"

function UpdateTicket() {
    const { id } = useParams()

    const {
        handleUpdateSubmit,
        handleSectorChange,
        handleGetTicket,
        handleEventChange,
        handleAddSector,
        handleRemoveSector,
        errorMessage,
        eventName,
        location,
        date,
        details,
        contact,
        startAt,
        endAt,
        sector,
        isVisible
    } = useRegisterTickets()

    useEffect(() => {
        handleGetTicket(id)
    }, [])

    const handleUpdate = (event) => {
        handleUpdateSubmit(event, id)
    }

    return (
        <form className="form-tickets not-selectable" onSubmit={handleUpdate}>
            <div className="form-tickets-container">
                <div className="form-tickets-column">
                    <label>
                        Nome do Evento:
                        <input
                            type="text"
                            name="eventName"
                            value={eventName.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                    <label>
                        Localização:
                        <input
                            type="text"
                            name="location"
                            value={location.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                    <label>
                        Data:
                        <input
                            type="date"
                            name="date"
                            value={date.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                    <label>
                        Detalhes:
                        <textarea
                            name="details"
                            value={details.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                    <label className="labelCheck">
                        Visível:
                        <input
                            name="isVisible"
                            type="checkbox"
                            checked={isVisible.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                </div>
                <div className="form-tickets-column">
                    <label>
                        Contato:
                        <input
                            type="text"
                            name="contact"
                            value={contact.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                    <label>
                        Data/hora Inicio:
                        <input
                            type="datetime-local"
                            name="startAt"
                            value={startAt.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                    <label>
                        Data/hora Fim:
                        <input
                            type="datetime-local"
                            name="endAt"
                            value={endAt.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                </div>
            </div>
            {sector.value &&
                sector.value.map((sectorItem, index) => (
                    <div className="not-selectable" key={index}>
                        <div className="tickets-section-header">
                            <h3>Setores {index + 1}</h3>
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
                ))
            }

            <button onClick={handleAddSector}>Adicionar Setor</button>
            <button className="tickets-button-submit" type="submit">Salvar</button>
        </form>
    )
}

export default UpdateTicket
