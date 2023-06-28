import axios from 'axios'
import { useState } from "react"
import { myRoutes } from "../routes/routes"

export function useRegister() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const resetForm = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhone("")
        setPassword("")
        setConfirmPassword("")
        setErrorMessage("")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match")
        } else {
            try {
                const response = await axios.post(`${myRoutes.routeBody}${myRoutes.routeUser}`, {
                    firstName,
                    lastName,
                    email,
                    phone,
                    password,
                    role: "buyer"
                })
                resetForm()
                if (response.status === 200) {
                    return window.location.href = `${myRoutes.routeLogin}`
                }
            } catch (error) {
                console.error(error)
                setErrorMessage(error?.response?.data?.message || "An unspecified error occurred")
            }
        }
    }
    
    return {
        handleSubmit,
        errorMessage,
        firstName: { value: firstName, setValue: setFirstName },
        lastName: { value: lastName, setValue: setLastName },
        email: { value: email, setValue: setEmail },
        phone: { value: phone, setValue: setPhone },
        password: { value: password, setValue: setPassword },
        confirmPassword: { value: confirmPassword, setValue: setConfirmPassword }
    }

}