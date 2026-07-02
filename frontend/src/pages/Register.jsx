import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await API.post("/auth/register", {
                name,
                email,
                password
            });

            navigate("/verify-otp");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">

            <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-96">

                <h1 className="text-3xl font-bold text-white mb-2">
                    Create Account
                </h1>

                <p className="text-slate-400 mb-6">
                    Register to continue
                </p>

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
                    >
                        Register
                    </button>

                </form>

                <p className="text-slate-400 text-center mt-4">
                    Already have an account?

                    <span
                        onClick={() => navigate("/")}
                        className="text-blue-500 cursor-pointer ml-2"
                    >
                        Login
                    </span>
                </p>

            </div>

        </div>
    );
};

export default Register;