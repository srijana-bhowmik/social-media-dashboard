// in social_metrics table, map followers vs date recorded

import { useEffect, useState } from "react";
import API from "../services/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const FollowersChart = ({
    accountId,
    accounts, 
    setSelectedAccount 
}) => {

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        if (!accountId) return;

        const fetchMetrics = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await API.get(`/metrics/${accountId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const sorted = res.data.sort(
                    (a, b) => new Date(a.recorded_at) - new Date(b.recorded_at)
                );

                const labels = sorted.map((item) =>
                    new Date(item.recorded_at).toLocaleDateString()
                );

                const followers = sorted.map((item) => item.followers);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Followers",
                            data: followers,
                            borderColor: "#3B82F6",
                            tension: 0.4
                        }
                    ]
                });

            } catch (error) {
                console.log(error);
            }
        };

        fetchMetrics();
    }, [accountId]);
    
return (
    <div className="bg-slate-800 p-6 h-96 w-1/2 rounded-xl mt-8">

        <div className="flex justify-between items-center mb-4">

            <h2 className="text-white text-xl font-bold">
                Followers Growth VS Time
            </h2>

            <select
                value={accountId}
                onChange={(e) =>
                    setSelectedAccount(e.target.value)
                }
                className="bg-gray-100 text-slate-900 px-3 py-2 rounded-lg"
            >
                {accounts?.map((account) => (
                    <option
                        key={account.id}
                        value={account.id}
                    >
                        {account.platform}
                    </option>
                ))}
            </select>

        </div>

        <Line data={chartData} />

    </div>
)}
export default FollowersChart;