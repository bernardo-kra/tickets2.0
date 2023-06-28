import axios from 'axios'
import { useState } from "react"
import { myRoutes } from "../../routes/routes"

export function useRegisterTickets() {
    const [eventName, setEventName] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [details, setDetails] = useState("");
    const [contact, setContact] = useState("");
    const [startAt, setStartAt] = useState("");
    const [endAt, setEndAt] = useState("");
    const [creatorId, setCreatorId] = useState(localStorage.getItem('userId') || "");
    const [sector, setSector] = useState([{ name: "", quantity: "", value: "" }]);
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const token = localStorage.getItem("token");

    const resetForm = () => {
        setErrorMessage("");
        setEventName("");
        setLocation("");
        setDate("");
        setDetails("");
        setContact("");
        setStartAt("");
        setEndAt("");
        setCreatorId("");
        setSector([{ name: "", quantity: "", value: "" }]);
        setIsVisible(false);
    };

    const handleEventChange = (event) => {
        const { name, value, type, checked } = event.target;

        switch (name) {
            case "eventName":
                setEventName(value);
                break;
            case "location":
                setLocation(value);
                break;
            case "date":
                setDate(value);
                break;
            case "details":
                setDetails(value);
                break;
            case "contact":
                setContact(value);
                break;
            case "startAt":
                setStartAt(value);
                break;
            case "endAt":
                setEndAt(value);
                break;
            case "isVisible":
                setIsVisible(type === 'checkbox' ? checked : value);
                break;
            default:
                break;
        }
    };

    const handleSectorChange = (index, field, value) => {
        const newSector = [...sector];
        newSector[index][field] = value;
        setSector(newSector);
    };

    const handleAddSector = (event) => {
        event.preventDefault();
        setSector([...sector, { name: "", quantity: "", value: "" }]);
    };

    const handleRemoveSector = (event, index) => {
        event.preventDefault();
        const newSector = [...sector];
        newSector.splice(index, 1);
        setSector(newSector);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(
                `${myRoutes.routeBody}${myRoutes.routeCreateTickets}`,
                {
                    eventName,
                    location,
                    date,
                    details,
                    contact,
                    startAt,
                    endAt,
                    creatorId,
                    sector,
                    isVisible
                },
                { headers: { Authorization: `${token}` } }
            );
            resetForm();
        } catch (error) {
            console.error(error);
            setErrorMessage(
                error?.response?.data?.message || "An unspecified error occurred"
            );
        }
    };

    const handleUpdateSubmit = async (event, ticketId) => {
        event.preventDefault();
        try {
            const data = {
                eventName,
                location,
                date,
                details,
                contact,
                startAt,
                endAt,
                creatorId,
                sector: JSON.stringify(sector),
                isVisible,
            };

            await axios.put(
                `${myRoutes.routeBody}${myRoutes.routeUpdate(ticketId)}`,
                data,
                { headers: { Authorization: `${token}` } }
            );
        } catch (error) {
            console.error(error);
            setErrorMessage(
                error?.response?.data?.message || "An unspecified error occurred"
            );
        }
    };

    const handleGetTicket = async (id) => {
        try {
            const { data } = await axios.get(
                `${myRoutes.routeBody}/my-tickets/${id}`,
                { headers: { Authorization: `${token}` } }
            );

            let sectors = typeof data.sector === "string" ? JSON.parse(data.sector) : data.sector;
            setEventName(data.eventName || "");
            setLocation(data.location || "");
            setDate(data.date || "");
            setDetails(data.details || "");
            setContact(data.contact || "");
            setStartAt(data.startAt || "");
            setEndAt(data.endAt || "");
            setSector(sectors || []);
            setIsVisible(data.isVisible || false);
        } catch (error) {
            console.error("Failed to fetch ticket", error);
        }
    };

    return {
        handleUpdateSubmit,
        handleGetTicket,
        handleEventChange,
        handleSectorChange,
        handleSubmit,
        handleAddSector,
        handleRemoveSector,
        resetForm,
        errorMessage,
        eventName: { value: eventName, setValue: setEventName },
        location: { value: location, setValue: setLocation },
        date: { value: date, setValue: setDate },
        details: { value: details, setValue: setDetails },
        contact: { value: contact, setValue: setContact },
        startAt: { value: startAt, setValue: setStartAt },
        endAt: { value: endAt, setValue: setEndAt },
        creatorId: { value: creatorId, setValue: setCreatorId },
        sector: { value: sector, setValue: setSector },
        isVisible: { value: isVisible, setValue: setIsVisible }
    };
}
