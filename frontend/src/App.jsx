import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddAccount from './pages/AddAccount'
import AddMetrics from './pages/AddMetrics'
import Accounts from './pages/Accounts'

const App = () => {
   return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-account" element={<AddAccount />} />
        <Route path="/add-metrics" element={<AddMetrics />} />
        <Route path="/accounts" element={<Accounts />} />
    </Routes>
  );
}

export default App
