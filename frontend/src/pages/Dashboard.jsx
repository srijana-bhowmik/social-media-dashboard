import { useState,useEffect } from "react";
import API from "../services/api";
import StatCard from "../components/StatCard";
import Navbar from "../components/Navbar";
import FollowersChart from "../components/FollowersChart";
import MetricsTable from "../components/MetricsTable";
import PlatformComparisonChart from "../components/PlatformComparisonChart";
import LikesPieChart from "../components/LikesPieChart";
const Dashboard=()=>{ 
    const [summary, setSummary] = useState({
        totalAccounts: 0,
        totalFollowers: 0,
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0
    });
   
    useEffect(()=>{

        const fetchSummary=async()=>{
            try{
                const token=localStorage.getItem("token");
                const res=await API.get("/dashboard/summary",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );
                setSummary(res.data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchSummary();
    },[]);

    const scard=[
        {title:"Accounts",value:summary.totalAccounts},
        {title:"Followers",value:summary.totalFollowers},
        {title:"Likes",value:summary.totalLikes},
        {title:"Comments",value:summary.totalComments},
        {title:"Shares",value:summary.totalShares},
    ]

    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState("");
    

    useEffect(()=>{
        const fetchAccounts=async()=>{
            try{
                const token=localStorage.getItem("token");
                const res=await API.get("/dashboard/accounts",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAccounts(res.data);
                if(res.data.length>0){
                    setSelectedAccount(res.data[0].id);
                }
            }
            catch(error){
                console.log(error);
            }
        }
        fetchAccounts();
    },[]);

    return(
        <div className="min-h-screen bg-slate-900">

            <Navbar />
            <div className="p-8">

                <h2 className="text-slate-300 text-xl mb-6">
                    Overview
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {
                        scard.map((card) => (
                            <StatCard key={card.title} title={card.title} value={card.value} />
                        ))
                    }
                </div>   
            </div> 
            <div className=" flex justify-center">  
                <FollowersChart accounts={accounts} accountId={selectedAccount} setSelectedAccount={setSelectedAccount}/>
            </div>
            <div className="pl-14 pr-14" >
                <MetricsTable accountId={selectedAccount}/>
            </div>
            <div className="flex justify-center ">
                <PlatformComparisonChart/>
            </div>
            <div className="flex justify-center " >
                <LikesPieChart/>
            </div>
        </div> 
    )
}
export default Dashboard