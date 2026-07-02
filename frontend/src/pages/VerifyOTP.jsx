import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useLocation } from "react-router-dom";

const VerifyOTP = () => { 
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const stateEmail = location.state?.email || "";
    const handleVerify = async (e) => {
        e.preventDefault();
        try{
            const res= await API.post("/auth/verify-otp", {
                email: stateEmail,
                otp
            });
            alert(res.data.message);
            navigate("/");
        }
        catch(error){
            alert(error.response?.data?.message || "Verification failed");
        }
    };
    return(
        <div className="min-h-screen bg-black flex items-center justify-center">

            <form
                onSubmit={handleVerify}
                className="bg-slate-800 p-6 rounded-lg"
            >
                <h2 className="text-white text-2xl mb-4">
                    Verify OTP
                </h2>

                <p className="text-slate-400 mb-4">
                    OTP sent to: {stateEmail}
                </p>

                <input
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) =>
                        setOtp(e.target.value)
                    }
                    className="bg-slate-700 rounded-md w-full p-2 mb-3 text-white"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Verify
                </button>
                {/* //resend otp button */}
                <button
                    type="button"
                    onClick={async () => {
                        try {
                            const res = await API.post("/auth/resend-otp", { email: stateEmail });
                            alert(res.data.message);
                        } catch (error) {
                            alert(error.response?.data?.message || "Resend OTP failed");
                        }
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded ml-2"
                >
                    Resend OTP
                </button>
            </form>
        </div>
    );
} 

export default VerifyOTP;