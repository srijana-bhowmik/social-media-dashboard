import React from 'react'
import {useEffect, useState} from 'react'
import API from '../services/api'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const PlatformComparisonChart = () => {
    const [chartData,setChartData]=useState({
        labels:[],
        datasets:[]
    })

    useEffect(()=>{
        const fetchComparison=async ()=>{
            try{
                const token=localStorage.getItem("token");
                const res=await API.get(`/dashboard/platform-comparison`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const labels = res.data.map(
                    item => item.platform
                );

                const followers = res.data.map(
                    item => item.followers
                );

                setChartData({
                    labels,
                    datasets:[
                        {
                            label: "Followers",
                            data: followers,
                            backgroundColor: "#3B82F6" 
                        }
                    ]
                });
            }
            catch(error){
                console.log(error);
            }
        }
        fetchComparison();
    },[]);
  return (
    <>
      <div className="bg-slate-800 rounded-xl p-6 mt-8 w-1/2">
            <h2 className="text-white text-xl font-bold mb-4">
                Followers by Platform
            </h2>

            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                color: "white"
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: "white"
                            }
                        },
                        y: {
                            ticks: {
                                color: "white"
                            }
                        }
                    }
                }}
            />
        </div>
    </>
  )
}

export default PlatformComparisonChart
