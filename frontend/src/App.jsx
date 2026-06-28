import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddAccount from './pages/AddAccount'
import AddMetrics from './pages/AddMetrics'
import Accounts from './pages/Accounts'
import {jwtDecode} from "jwt-decode";
import NotFound from './pages/NotFound'


const App = () => {
  const token=localStorage.getItem("token");
  const user=token?jwtDecode(token):null;
   return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {user?.role=="admin" && (
          <>
            <Route path="/add-account" element={<AddAccount />} />
            <Route path="/add-metrics" element={<AddMetrics />} />
          </>
        )} 
        <Route path="/accounts" element={<Accounts />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App
