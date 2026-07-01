import { useEffect, useState } from "react";
import API from "../services/api";
const MetricsTable = ({accountId}) => {
    const [metrics, setMetrics]=useState([]);
    useEffect(()=>{
         if(!accountId){
            return;
        }
        const fetchMetrics=async()=>{ 
            try{
                const token=localStorage.getItem("token");
                const res=await API.get(`/metrics/${accountId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMetrics(res.data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchMetrics();
    },[accountId]);

    return (
        <div className="bg-slate-800 rounded-xl p-6 mt-8">
            <h2 className="text-white text-xl font-bold mb-4">
                Recent Metrics
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-600 text-slate-300">
                            <th className="p-3">Date</th>
                            <th className="p-3">Followers</th>
                            <th className="p-3">Likes</th>
                            <th className="p-3">Comments</th>
                            <th className="p-3">Shares</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...metrics]
                        .sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at))
                        .slice(-8)  //display only the last 8 metrics
                        .map((metric) => (
                            <tr key={metric.id} className="border-b border-slate-700 text-white">
                            <td className="p-3">
                                {new Date(metric.recorded_at).toLocaleDateString()}
                            </td>
                            <td className="p-3">{metric.followers}</td>
                            <td className="p-3">{metric.likes_count}</td>
                            <td className="p-3">{metric.comments_count}</td>
                            <td className="p-3">{metric.shares_count}</td>
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default MetricsTable;