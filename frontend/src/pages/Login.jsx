import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login=()=>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        }
        catch (error) {
          console.log(error);

          alert(
              error.response?.data?.message ||
              "Login failed"
          );
      }
    };


return (
  <div className="min-h-screen bg-black flex items-center justify-center">

    <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-96">

      <h1 className="text-3xl font-bold text-white mb-2">
        Social Dashboard
      </h1>

      <p className="text-slate-400 mb-6">
        Sign in to continue
      </p>

      <form onSubmit={handleLogin}>

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
          Login
        </button>
        <p className="text-slate-400 text-center mt-4">
          Don't have an account?

          <span
              onClick={() => navigate("/register")}
              className="text-blue-500 cursor-pointer ml-2"
          >
              Register
          </span>
      </p>

      </form>

    </div>

  </div>
)
}

export default Login