import { useState, createContext, useEffect } from 'react'
import axios from 'axios'
import myRoutes from '../routes/routes'

const AuthContext = createContext()

const useAuthProvider = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [messageErr, setMessageErr] = useState('');
  
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const userRole = localStorage.getItem('role');
      
      if (token) {
        try {
          await axios.get(`${myRoutes.routeBody}${myRoutes.routeProtect}`, {
            headers: { Authorization: `${token}` },
          });
  
          setIsLoggedIn(true);
          setUser(userId);
          setRole(userRole);
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('role');
          console.error(err);
        }
      }
    };
  
    useEffect(() => {
      checkLoginStatus();
    }, []);
  
    const handleLogin = async (credentials) => {
        try {
          const response = await axios.post(
            `${myRoutes.routeBody}${myRoutes.routeLogin}`,
            credentials
          );
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.user.id);
          localStorage.setItem('role', response.data.user.role);
    
          setIsLoggedIn(true);
          setUser(response.data.user.id);
          setRole(response.data.user.role);
    
          updateRole(response.data.user.role);
        } catch (err) {
          setMessageErr(err);
        }
      };
  
      const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
    
        setIsLoggedIn(false);
        setUser(null);
        setRole(null);
    
        updateRole(null);
      };

      const updateRole = (newRole) => {
        setRole(newRole);
      };
  
      return {
        isLoggedIn,
        user,
        role,
        messageErr,
        login: handleLogin,
        logout: handleLogout,
      };
  };

export { AuthContext, useAuthProvider }
