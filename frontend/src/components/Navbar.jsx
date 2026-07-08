import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            localStorage.removeItem("token");
            navigate("/");
        }
    }

    return (
        <div className="flex justify-between items-center p-5 border-b border-slate-700">
            <h1 className="text-white text-3xl font-bold pl-2">
                Social Media Dashboard
            </h1>

            <button
                className="bg-white px-4 py-2 rounded-lg text-red-500"
                onClick={logout}
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar