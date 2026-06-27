import { useEffect,useState } from "react";
import API from "../services/api";

import{
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);
const LikesPieChart=()=>{

    const [chartData,setChartData]=useState({
        labels:[],
        datasets:[]
    })
    useEffect(()=>{
        const fetchLikesData=async ()=>{
            try{
                const token=localStorage.getItem("token");
                const res=await API.get(`/dashboard/likes-distribution`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const labels = res.data.map(
                    item => item.platform
                );
                const likes=res.data.map(
                    item=>Number(item.likes_count)
                )
                 setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Likes",
                            data: likes,
                            backgroundColor: [
                                "#3B82F6",
                                "#10B981",
                                "#F59E0B",
                                "#EF4444",
                                "#8B5CF6"
                            ]
                        }
                    ]
                });
            }catch(error){
                console.log(error);
            }
        }
        fetchLikesData();
    },[]);

    return(
        <div className="bg-slate-800 rounded-xl w-1/2 p-6 mt-8">
            <h2 className="text-white text-xl font-bold mb-4">
                Likes Distribution by Platform
            </h2>

            <div className="max-w-md mx-auto">
                <Pie
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                labels: {
                                    color: "white"
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default LikesPieChart;