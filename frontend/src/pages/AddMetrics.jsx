import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

const AddMetrics = () => {
    const [accounts, setAccounts] = useState([]);

    const [formData, setFormData] = useState({
        account_id: "",
        followers: "",
        likes_count: "",
        comments_count: "",
        shares_count: ""
    });

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await API.get(
                    "/dashboard/accounts",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setAccounts(res.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchAccounts();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await API.post(
                "/metrics/add",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Metrics added successfully");

            setFormData({
                account_id: "",
                followers: "",
                likes_count: "",
                comments_count: "",
                shares_count: ""
            });

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to add metrics"
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
                            Add Metrics
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                        >

                            <select
                                name="account_id"
                                value={formData.account_id}
                                onChange={handleChange}
                                className="bg-slate-700 text-white p-3 rounded-lg"
                                required
                            >
                                <option value="">
                                    Select Account
                                </option>

                                {accounts.map((account) => (
                                    <option
                                        key={account.id}
                                        value={account.id}
                                    >
                                        {account.platform}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                name="followers"
                                placeholder="Followers"
                                value={formData.followers}
                                onChange={handleChange}
                                className="bg-slate-700 text-white p-3 rounded-lg"
                                required
                            />

                            <input
                                type="number"
                                name="likes_count"
                                placeholder="Likes"
                                value={formData.likes_count}
                                onChange={handleChange}
                                className="bg-slate-700 text-white p-3 rounded-lg"
                                required
                            />

                            <input
                                type="number"
                                name="comments_count"
                                placeholder="Comments"
                                value={formData.comments_count}
                                onChange={handleChange}
                                className="bg-slate-700 text-white p-3 rounded-lg"
                                required
                            />

                            <input
                                type="number"
                                name="shares_count"
                                placeholder="Shares"
                                value={formData.shares_count}
                                onChange={handleChange}
                                className="bg-slate-700 text-white p-3 rounded-lg"
                                required
                            />

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                            >
                                Add Metrics
                            </button>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddMetrics;