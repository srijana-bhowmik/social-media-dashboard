import { useState,useEffect } from "react";
import API from "../services/api";
import StatCard from "../components/StatCard";
import Navbar from "../components/Navbar";
import FollowersChart from "../components/FollowersChart";
import MetricsTable from "../components/MetricsTable";
import PlatformComparisonChart from "../components/PlatformComparisonChart";
import LikesPieChart from "../components/LikesPieChart"; 
import Sidebar from "../components/Sidebar";

const Dashboard=()=>{ 
    const [summary, setSummary] = useState({
        totalAccounts: 0,
        totalFollowers: 0,
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0
    });
 
    const scard = [
        { title: "Total Accounts", value: summary.totalAccounts },
        { title: "Total Followers", value: summary.totalFollowers },
        { title: "Total Likes", value: summary.totalLikes },
        { title: "Total Comments", value: summary.totalComments },
        { title: "Total Shares", value: summary.totalShares },
    ]

    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState("");
    


    // const fetchInstagramLive = async (accountId, igId, token) => {
    //     try {
    //         const res = await API.post(
    //             "/metrics/instagram/fetch",
    //             {
    //                 account_id: accountId,
    //                 ig_id: igId,
    //                 access_token: token
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             }
    //         );

    //         return res.data.data; // { followers, likes, comments }
    //     } catch (err) {
    //         console.log("Instagram fetch error:", err);
    //         return null;
    //     }
    // };

    //updates followers,likes,comments every 30 seconds
    // useEffect(() => {
    //     const loadInstagramData = async () => {
    //         if (!selectedAccount) return;
    //         if (!accounts || accounts.length === 0) return;

    //         const account = accounts.find(a => String(a.id) === String(selectedAccount));
    //         if (!account?.ig_id) return;

    //         const token = localStorage.getItem("token");

    //         const data = await fetchInstagramLive(
    //             account.id,
    //             account.ig_id,
    //             token
    //         );

    //         if (data) {
    //             setLiveMetrics({
    //                 totalFollowers: data.followers,
    //                 totalLikes: data.likes,
    //                 totalComments: data.comments
    //             });
    //         }
    //     };

    //     loadInstagramData(); // initial call

    //     const interval = setInterval(() => {
    //         loadInstagramData(); // auto refresh
    //     }, 30000); // 30 seconds

    //     return () => clearInterval(interval);
    // }, [selectedAccount, accounts]);
   
    useEffect(() => {

        const fetchSummary = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await API.get(
                    "/dashboard/summary",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setSummary(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSummary();
        const interval = setInterval(fetchSummary, 30000);
        return () => clearInterval(interval);
    }, []);

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
                console.log("FETCH ACCOUNTS API HIT");
                console.log("token:", localStorage.getItem("token"));
                console.log("accounts response:", res.data);
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

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return(
        <div className="min-h-screen bg-slate-900">
            <div className="flex items-center border-b border-slate-700">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="ml-4 bg-slate-800 text-white px-3 py-2 rounded-lg"
                >
                    ☰
                </button>
                <div className="flex-1">
                    <Navbar />
                </div>
            </div>
            
            {sidebarOpen && (
                <> 
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setSidebarOpen(false)}
                    /> 
                    <div className="fixed top-0 left-0 z-50">
                        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
                    </div>
                </>
            )}
            
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
                <p className="text-xs text-red-500 mb-2">
                    ⚠️ N/A = Metric not provided by the platform API.
                </p>
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