import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API, { authConfig } from "../services/api";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import HeroStat from "../components/HeroStat";
import Notice from "../components/Notice";
import FollowersChart from "../components/FollowersChart";
import MetricsTable from "../components/MetricsTable";
import PlatformComparisonChart from "../components/PlatformComparisonChart";
import LikesPieChart from "../components/LikesPieChart";
import { Icon } from "../components/Icons";
import { platformMeta } from "../utils/format";

const Dashboard = () => {
    const [summary, setSummary] = useState({
        totalAccounts: 0,
        totalFollowers: 0,
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0
    });

    const scard = [
        { title: "Connected accounts", value: summary.totalAccounts, icon: Icon.Link, tone: "brand" },
        { title: "Total likes", value: summary.totalLikes, icon: Icon.Heart, tone: "coral" },
        { title: "Total comments", value: summary.totalComments, icon: Icon.Comment, tone: "iris" },
        { title: "Total shares", value: summary.totalShares, icon: Icon.Share, tone: "sun" },
    ];

    const [accounts, setAccounts] = useState([]);
    const [accountsLoaded, setAccountsLoaded] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState("");

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await API.get("/dashboard/summary", authConfig());
                setSummary(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSummary();
        const interval = setInterval(fetchSummary, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const res = await API.get("/dashboard/accounts", authConfig());
                setAccounts(res.data);
                if (res.data.length > 0) {
                    setSelectedAccount(res.data[0].id);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setAccountsLoaded(true);
            }
        };
        fetchAccounts();
    }, []);

    const current = accounts.find((a) => String(a.id) === String(selectedAccount));
    const currentLabel = current
        ? `${platformMeta(current.platform).label}${current.account_name ? ` (${current.account_name})` : ""}`
        : "";

    const hasExpired = accounts.some((a) => a.status === "expired");
    const showNotice = accountsLoaded && (accounts.length === 0 || hasExpired);

    return (
        <Layout title="Dashboard" subtitle="See how your audience is growing across platforms.">
            <div className="space-y-6">
                {showNotice && (
                    <Notice kind="warn">
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                            <span>
                                {accounts.length === 0
                                    ? "Connect an account to fill your dashboard with data."
                                    : "One or more accounts need to be reconnected to keep your numbers up to date."}
                            </span>
                            <Link
                                to={accounts.length === 0 ? "/add-account" : "/accounts"}
                                className="font-semibold underline underline-offset-2"
                            >
                                {accounts.length === 0 ? "Add account" : "Review accounts"}
                            </Link>
                        </div>
                    </Notice>
                )}

                <div className="grid gap-5 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <HeroStat followers={summary.totalFollowers} accounts={summary.totalAccounts} />
                    </div>
                    <div className="grid grid-cols-2 gap-5 lg:col-span-3">
                        {scard.map((card) => (
                            <StatCard key={card.title} {...card} />
                        ))}
                    </div>
                </div>

                <div className="grid gap-5 xl:grid-cols-3">
                    <FollowersChart
                        className="xl:col-span-2"
                        accounts={accounts}
                        accountsLoaded={accountsLoaded}
                        accountId={selectedAccount}
                        setSelectedAccount={setSelectedAccount}
                    />
                    <LikesPieChart />
                </div>

                <div className="grid gap-5 xl:grid-cols-3">
                    <MetricsTable
                        className="xl:col-span-2"
                        accountId={selectedAccount}
                        accountLabel={currentLabel}
                    />
                    <PlatformComparisonChart />
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
