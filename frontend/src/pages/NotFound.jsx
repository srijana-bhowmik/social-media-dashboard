import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">

            <h1 className="text-8xl font-bold mb-4">
                404
            </h1>

            <p className="text-2xl mb-6">
                Page Not Found
            </p>

            <button
                onClick={() => navigate("/dashboard")}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
            >
                Go To Dashboard
            </button>

        </div>
    );
};

export default NotFound;