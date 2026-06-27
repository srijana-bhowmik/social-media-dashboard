import { useState } from "react";
import API from "../services/api";

const AddAccountForm=({ onAccountAdded }) => {
    const [platform, setPlatform] = useState("");
    const [accountName, setAccountName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const token=localStorage.getItem("token");
            await API.post("/social-account/add",
                {
                    platform,
                    account_name: accountName
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            alert("Account added successfully");
            setPlatform("");
            setAccountName("");
            if(onAccountAdded){
                onAccountAdded();
            }
        }
        catch(error){
            console.log(error);
            alert(
                error.response?.data?.message || "Failed to add account"
            )
        }
    }
    return (
        <div className="bg-slate-800 rounded-xl p-6 mb-8">
            <h2 className="text-white text-xl font-bold mb-4">
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
    );
};

export default AddAccountForm;