import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const VerifyOTP = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const handleVerify = async (e) => {
        e.preventDefault();
        try{
            const res= await API.post("/auth/verify-otp", { email, otp });
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

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="bg-slate-700 rounded-md  w-full p-2 mb-3 text-white"
                />

                <input
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) =>
                        setOtp(e.target.value)
                    }
                    className="bg-slate-700 rounded-md rounded w-full p-2 mb-3 text-white"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Verify
                </button>

            </form>
        </div>
    );
};

export default VerifyOTP;