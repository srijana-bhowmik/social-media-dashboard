// in social_metrics table, map followers vs date recorded

import { useEffect, useMemo, useState } from "react";
import API, { authConfig } from "../services/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import EmptyState, { Skeleton } from "./EmptyState";
import { Icon } from "./Icons";
import { formatCompact, formatDate, formatNumber, platformMeta } from "../utils/format";
import { gridColor, tooltipStyle } from "../utils/chartTheme";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
);

const AccountSelect = ({ accountId, accounts, onChange }) => (
    <div className="relative">
        <label htmlFor="account-select" className="sr-only">
            Account
        </label>
        <select
            id="account-select"
            value={accountId}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none rounded-xl border border-line bg-canvas py-2 pl-3.5 pr-9 text-sm font-semibold text-ink outline-none transition hover:border-brand-500/40 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
        >
            {accounts?.map((account) => (
                <option key={account.id} value={account.id}>
                    {platformMeta(account.platform).label}
                    {account.account_name ? ` (${account.account_name})` : ""}
                </option>
            ))}
        </select>
        <Icon.ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
    </div>
);

const FollowersChart = ({
    accountId,
    accounts,
    accountsLoaded = true,
    setSelectedAccount,
    className = ""
}) => {

    const [points, setPoints] = useState({ labels: [], values: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!accountId) return;

        let active = true;
        setLoading(true);

        const fetchMetrics = async () => {
            try {
                const res = await API.get(`/metrics/${accountId}`, authConfig());
                if (!active) return;

                const sorted = [...res.data].sort(
                    (a, b) => new Date(a.recorded_at) - new Date(b.recorded_at)
                );

                if (sorted.length === 0) {
                    setPoints({ labels: [], values: [] });
                    return;
                }

                // First and latest recorded dates
                const startTime = new Date(sorted[0].recorded_at).getTime();
                const endTime = new Date(sorted[sorted.length - 1].recorded_at).getTime();

                // Create 10 evenly spaced points across the full time span
                const selected = [];

                for (let i = 0; i < 10; i++) {
                    const targetTime =
                        startTime + ((endTime - startTime) * i) / 9;

                    // Find the metric closest to this target date
                    let closest = sorted[0];
                    let closestDifference = Math.abs(
                        new Date(sorted[0].recorded_at).getTime() - targetTime
                    );

                    for (const item of sorted) {
                        const difference = Math.abs(
                            new Date(item.recorded_at).getTime() - targetTime
                        );

                        if (difference < closestDifference) {
                            closest = item;
                            closestDifference = difference;
                        }
                    }

                    selected.push(closest);
                }

                setPoints({
                    labels: selected.map((item) => formatDate(item.recorded_at)),
                    values: selected.map((item) => item.followers)
                });
                } catch (error) {
                    console.log(error);
                } finally {
                    if (active) setLoading(false);
                }
            };

        // Fetch immediately when account changes/page loads
        fetchMetrics();

        // Fetch again every 30 seconds
        const interval = setInterval(fetchMetrics, 30000);

        // Stop interval when component is removed/account changes
        return () => {
            active = false;
            clearInterval(interval);
        };
    }, [accountId]);

    const data = useMemo(() => ({
        labels: points.labels,
        datasets: [
            {
                label: "Followers",
                data: points.values,
                borderColor: "#12898f",
                borderWidth: 3,
                tension: 0.35,
                fill: true,
                backgroundColor: (context) => {
                    const { ctx, chartArea } = context.chart;
                    if (!chartArea) return "rgba(18,137,143,0.12)";
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, "rgba(18,137,143,0.28)");
                    gradient.addColorStop(1, "rgba(18,137,143,0)");
                    return gradient;
                },
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: "#ffffff",
                pointHoverBorderColor: "#12898f",
                pointHoverBorderWidth: 3
            }
        ]
    }), [points]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
            legend: { display: false },
            tooltip: {
                ...tooltipStyle,
                displayColors: false,
                callbacks: {
                    label: (item) => `${formatNumber(item.parsed.y)} followers`
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                border: { display: false },
                ticks: { maxTicksLimit: 7, maxRotation: 0 }
            },
            y: {
                grid: { color: gridColor },
                border: { display: false },
                ticks: { maxTicksLimit: 5, callback: (value) => formatCompact(value) }
            }
        }
    };

    const noAccounts = accountsLoaded && (!accounts || accounts.length === 0);
    const showSkeleton = !accountsLoaded || (accountId && loading);

    let body;
    if (showSkeleton) {
        body = <Skeleton className="h-72 sm:h-80" />;
    } else if (noAccounts) {
        body = (
            <EmptyState
                icon={Icon.Link}
                title="No accounts connected yet"
                message="Connect Facebook, Instagram or X to see how your followers grow over time."
                actionLabel="Connect an account"
                actionTo="/add-account"
            />
        );
    } else if (points.values.length === 0) {
        body = (
            <EmptyState
                icon={Icon.Trend}
                title="No data for this account yet"
                message="Follower history will appear here after the first metrics are collected."
            />
        );
    } else {
        body = (
            <div className="h-72 sm:h-80">
                <Line data={data} options={options} />
            </div>
        );
    }

    return (
        <ChartCard
            className={className}
            title="Follower growth"
            subtitle="Followers over time for the selected account"
            action={
                !noAccounts && accounts?.length > 0 && (
                    <AccountSelect accountId={accountId} accounts={accounts} onChange={setSelectedAccount} />
                )
            }
        >
            {body}
        </ChartCard>
    );
};

export default FollowersChart;
