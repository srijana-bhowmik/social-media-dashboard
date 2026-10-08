import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import AuthShell from "../components/AuthShell";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Notice from "../components/Notice";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const notice = location.state?.notice;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        }
        catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Login failed. Check your details and try again.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <AuthShell
            title="Welcome back"
            subtitle="Sign in to see how your accounts are doing."
            footer={
                <>
                    New here?{" "}
                    <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
                        Create an account
                    </Link>
                </>
            }
        >
            <form onSubmit={handleLogin} className="space-y-5">
                {notice && !error && <Notice kind="success">{notice}</Notice>}
                {error && <Notice kind="error">{error}</Notice>}

                <TextField
                    label="Email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit" loading={loading} className="w-full">
                    {loading ? "Signing in…" : "Sign in"}
                </Button>
            </form>
        </AuthShell>
    );
};

export default Login;
