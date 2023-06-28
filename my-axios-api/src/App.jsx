import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext, useAuthProvider } from './Components/auth/AuthProvider';
import Navigation from './Components/Navigation/Navigation';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import FormTickets from './Components/tickets/formTickets/FormTickets';
import Calendar from './Components/Calendar/Calendar';
import TicketDetails from './Components/tickets/TicketDetails/TicketDetails';
import MyTickets from './Components/tickets/MyTickets/MyTickets';
import UpdateTicket from './Components/tickets/UpdateTicket/UpdateTicket';
import './index.css';

const App = () => {
  const authProvider = useAuthProvider();

  return (
    <AuthContext.Provider value={authProvider}>
      <Navigation />
      <Routes>
        <Route path="/tickets/:id" element={<TicketDetails />} />
        <Route path="/my-tickets/:id" element={<UpdateTicket />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/" element={<Calendar />} />
        <Route path="/create-tickets" element={<FormTickets />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
