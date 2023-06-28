import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../auth/AuthProvider"

const Logout = () => {
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); 
    }

    return (
        <div onClick={handleLogout}>Sair</div>
    )
}

export default Logout
