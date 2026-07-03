import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AddAccount = () => {

    // const handleInstagramLogin = () => {
    //     window.location.href =
    //         "http://localhost:3000/api/auth/instagram";
    // };

   const handleFacebookLogin = () => {
        const token = localStorage.getItem("token");

        console.log("LOCAL TOKEN:", token);

        const url =
            `http://localhost:3000/api/auth/facebook?token=${token}`;

        console.log("REDIRECT URL:", url);

        window.location.href = url;
    };
    const connectTwitter=()=>{
        const token=localStorage.getItem("token");
        window.location.href=`http://localhost:3000/api/auth/twitter?token=${token}`;
    }

    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 min-h-screen bg-slate-900">

                <Navbar />

                <div className="p-8">

                    <div className="bg-gray-300 rounded-xl p-6 max-w-xl">

                        <h2 className="text-slate-950 text-2xl font-bold mb-6">
                            Connect Social Account
                        </h2>

                        <div className="flex flex-col gap-4">
{/* 
                            <button
                                onClick={handleInstagramLogin}
                                className="bg-pink-700 hover:bg-pink-800 text-white py-3 rounded-lg font-semibold"
                            >
                                Connect Instagram
                            </button> */}

                            <button
                                onClick={handleFacebookLogin}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                            >
                                Connect Facebook & Instagram
                            </button>
                            <button
                                onClick={connectTwitter}
                                className="bg-black text-white py-3 rounded-lg font-semibold"
                            >
                                Connect X
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AddAccount;