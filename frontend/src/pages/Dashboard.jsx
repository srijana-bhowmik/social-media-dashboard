import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

    const [summary, setSummary] = useState(null);

    useEffect(() => {

        const fetchSummary = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const res = await API.get(
                    "/dashboard/summary",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setSummary(res.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchSummary();

    }, []);

    if (!summary) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>

            <h1>Dashboard</h1>

            <h3>
                Accounts:
                {summary.totalAccounts}
            </h3>

            <h3>
                Followers:
                {summary.totalFollowers}
            </h3>

            <h3>
                Likes:
                {summary.totalLikes}
            </h3>

            <h3>
                Comments:
                {summary.totalComments}
            </h3>

            <h3>
                Shares:
                {summary.totalShares}
            </h3>

        </div>
    );
}

export default Dashboard;