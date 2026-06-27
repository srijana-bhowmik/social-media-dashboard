import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import API from "../services/api";

const AddAccount = () => {
    const [platform, setPlatform] = useState("");
    const [accountName, setAccountName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await API.post(
                "/social-account/add",
                {
                    platform,
                    account_name: accountName
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Account added successfully");

            setPlatform("");
            setAccountName("");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to add account"
            );
        }
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 min-h-screen bg-slate-900">
                <Navbar />

                <div className="p-8">
                    <div className="bg-slate-800 rounded-xl p-6 max-w-xl">
                        <h2 className="text-white text-2xl font-bold mb-6">
                            Add Social Account
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                        >
                            <input
                                type="text"
                                placeholder="Platform"
                                value={platform}
                                onChange={(e) =>
                                    setPlatform(e.target.value)
                                }
                                className="bg-slate-700 text-white p-3 rounded-lg"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Account Name"
                                value={accountName}
                                onChange={(e) =>
                                    setAccountName(e.target.value)
                                }
                                className="bg-slate-700 text-white p-3 rounded-lg"
                                required
                            />

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                            >
                                Add Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAccount;