import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthProvider.jsx'
import Logout from "../../Login/Logout"
import './Header.css'

const Header = () => {
  const { isLoggedIn, user, role } = useContext(AuthContext)

  const isAdminOrClient = user && (role === 'admin' || role === 'client')

  return (
    <header className="header">
      <div className='header-content not-selectable'>
        <Link to="/">Inicial</Link>
        {isLoggedIn ?
          <>
            {isAdminOrClient &&
              <>
                <Link to="my-tickets">Meus Ingressos</Link>
                <Link to="create-tickets">Criar Evento</Link>
              </>
            }
            <Link ><Logout /></Link>

          </>
          :
          <div className="navigation-logout">
            <Link to="/register">Cadastrar</Link>
            <a> - </a>
            <Link to="/login">Entrar</Link>
          </div>

        }
      </div>
    </header >
  )
}

export default Header
