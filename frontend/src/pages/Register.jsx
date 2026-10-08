import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import AuthShell from "../components/AuthShell";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Notice from "../components/Notice";

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await API.post("/auth/register", {
                name,
                email,
                password
            });

            navigate("/verify-otp", { state: { email } });

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthShell
            title="Create your account"
            subtitle="It takes a minute. We'll email you a code to confirm your address."
            footer={
                <>
                    Already registered?{" "}
                    <Link to="/" className="font-semibold text-brand-600 hover:text-brand-700">
                        Sign in
                    </Link>
                </>
            }
        >
            <form onSubmit={handleRegister} className="space-y-5">
                {error && <Notice kind="error">{error}</Notice>}

                <TextField
                    label="Name"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                    autoComplete="new-password"
                    placeholder="Choose a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit" loading={loading} className="w-full">
                    {loading ? "Creating account…" : "Create account"}
                </Button>
            </form>
        </AuthShell>
    );
};

export default Register;
