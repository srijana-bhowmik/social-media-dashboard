import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
// import { jwtDecode } from "jwt-decode";

const Accounts = () => {
    // const token = localStorage.getItem("token");    //delete button is available to only admin(RBAC)
    // const user=token?jwtDecode(token):null;

    const [accounts, setAccounts] = useState([]);
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

        const handleDelete = async (id) => {
            const confirmed = window.confirm(
                "Are you sure you want to delete this account? All associated metrics will also be deleted."
            );
            if (!confirmed) {
                return;
            }
            try {
                const token = localStorage.getItem("token");
                await API.delete(
                    `/social-account/delete/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setAccounts(
                    accounts.filter(
                        account => account.id !== id
                    )
                );
                alert("Account deleted successfully");
            } catch (error) {
                console.log(error);
            }
        };
        // const handleSync = async (id) => {
        //     try {

        //         const token = localStorage.getItem("token");

        //         const res = await API.post(
        //             `/social-account/sync/${id}`,
        //             {},
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${token}`
        //                 }
        //             }
        //         );

        //         alert(res.data.message);

        //     } catch (error) {

        //         console.log(error);

        //         alert(
        //             error.response?.data?.message ||
        //             "Sync failed"
        //         );
        //     }
        // };
console.log("ACCOUNTS:", accounts);
console.log(
    accounts.map(account => account.platform)
);
    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 min-h-screen bg-slate-900">

                <Navbar />

                <div className="p-8">

                    <h1 className="text-3xl text-white font-bold mb-8">
                        Connected Accounts
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {accounts.map((account) => (

                            <div
                                key={account.id}
                                className="bg-slate-800 rounded-xl p-6 shadow-lg"
                            >

                                <h2 className="text-xl font-bold text-white mb-2">
                                    {account.platform}
                                </h2>

                                <p className="text-slate-300">
                                    {account.account_name}
                                </p>
                                {/* {user?.role=="admin" && (
                                    <> */}
                                    {/* <button
                                        onClick={() => handleSync(account.id)}
                                        className="mt-4 mr-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-white"
                                    >
                                        Sync
                                    </button>  */}
                                {account.platform !== "instagram" && (
                                    <button
                                        onClick={() => handleDelete(account.id)}
                                        className="mt-4 bg-red-900 hover:bg-red-700 px-2 py-1 rounded-lg text-white"
                                    >
                                        Delete
                                    </button>
                                )}
                                    {/* </>
                                )}  */}

                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accounts;