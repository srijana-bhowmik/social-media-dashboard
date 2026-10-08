import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import AuthShell from "../components/AuthShell";
import Button from "../components/Button";
import Notice from "../components/Notice";

const VerifyOTP = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [message, setMessage] = useState(null); // { kind, text }

    const navigate = useNavigate();
    const location = useLocation();
    const stateEmail = location.state?.email || "";

    const handleVerify = async (e) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);
        try {
            const res = await API.post("/auth/verify-otp", {
                email: stateEmail,
                otp
            });
            navigate("/", { state: { notice: res.data.message || "Email verified. You can sign in now." } });
        }
        catch (error) {
            setMessage({ kind: "error", text: error.response?.data?.message || "Verification failed. Check the code and try again." });
        }
        finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setMessage(null);
        setResending(true);
        try {
            const res = await API.post("/auth/resend-otp", { email: stateEmail });
            setMessage({ kind: "success", text: res.data.message || "A new code is on its way." });
        } catch (error) {
            setMessage({ kind: "error", text: error.response?.data?.message || "Couldn't resend the code. Try again." });
        } finally {
            setResending(false);
        }
    };

    return (
        <AuthShell
            title="Check your email"
            subtitle={
                stateEmail
                    ? `We sent a verification code to ${stateEmail}.`
                    : "Enter the verification code we emailed you."
            }
            footer={
                <Link to="/" className="font-semibold text-brand-600 hover:text-brand-700">
                    Back to sign in
                </Link>
            }
        >
            <form onSubmit={handleVerify} className="space-y-5">
                {message && <Notice kind={message.kind}>{message.text}</Notice>}

                <div>
                    <label htmlFor="otp" className="mb-1.5 block text-sm font-semibold text-ink-soft">
                        Verification code
                    </label>
                    <input
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        placeholder="Enter code"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full rounded-xl border border-line bg-white px-4 py-3.5 text-center font-display text-2xl font-semibold tracking-[0.35em] text-ink shadow-sm outline-none transition placeholder:text-base placeholder:font-normal placeholder:tracking-normal placeholder:text-muted/60 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                    />
                </div>

                <Button type="submit" loading={loading} className="w-full">
                    {loading ? "Verifying…" : "Verify email"}
                </Button>

                <div className="text-center text-sm text-muted">
                    Didn't get it?{" "}
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resending}
                        className="font-semibold text-brand-600 transition hover:text-brand-700 disabled:opacity-60"
                    >
                        {resending ? "Sending…" : "Resend code"}
                    </button>
                </div>
            </form>
        </AuthShell>
    );
};

export default VerifyOTP;
