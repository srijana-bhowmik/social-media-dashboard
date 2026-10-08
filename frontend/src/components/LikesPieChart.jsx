import { useEffect, useState } from "react";
import API, { authConfig } from "../services/api";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import EmptyState, { Skeleton } from "./EmptyState";
import { Icon } from "./Icons";
import { formatCompact, formatNumber, platformMeta } from "../utils/format";
import { tooltipStyle } from "../utils/chartTheme";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const LikesPieChart = ({ className = "" }) => {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLikesData = async () => {
            try {
                const res = await API.get(`/dashboard/likes-distribution`, authConfig());
                setRows(
                    res.data.map((item, index) => ({
                        ...platformMeta(item.platform, index),
                        likes: Number(item.likes_count) || 0
                    }))
                );
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchLikesData();
    }, []);

    const total = rows.reduce((sum, row) => sum + row.likes, 0);

    const data = {
        labels: rows.map((row) => row.label),
        datasets: [
            {
                label: "Likes",
                data: rows.map((row) => row.likes),
                backgroundColor: rows.map((row) => row.color),
                borderColor: "#ffffff",
                borderWidth: 3,
                hoverOffset: 6
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "72%",
        plugins: {
            legend: { display: false },
            tooltip: {
                ...tooltipStyle,
                callbacks: {
                    label: (item) => ` ${formatNumber(item.parsed)} likes`
                }
            }
        }
    };

    let body;
    if (loading) {
        body = <Skeleton className="h-64" />;
    } else if (rows.length === 0 || total === 0) {
        body = (
            <EmptyState
                icon={Icon.Heart}
                title="No likes to show yet"
                message="Once your accounts report likes, you'll see how they split by platform."
            />
        );
    } else {
        body = (
            <div className="flex flex-col items-center gap-6">
                <div className="relative h-44 w-44">
                    <Doughnut data={data} options={options} />
                    <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                        <div>
                            <p className="font-display text-2xl font-semibold tabular-nums text-ink">
                                {formatCompact(total)}
                            </p>
                            <p className="text-xs text-muted">total likes</p>
                        </div>
                    </div>
                </div>

                <ul className="w-full space-y-3">
                    {rows.map((row) => (
                        <li key={row.label} className="flex items-center gap-3 text-sm">
                            <span className="size-3 rounded-full" style={{ backgroundColor: row.color }} />
                            <span className="flex-1 font-medium text-ink-soft">{row.label}</span>
                            <span className="font-semibold tabular-nums text-ink">{formatNumber(row.likes)}</span>
                            <span className="w-12 text-right tabular-nums text-muted">
                                {Math.round((row.likes / total) * 100)}%
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <ChartCard className={className} title="Likes by platform" subtitle="Where your likes come from">
            {body}
        </ChartCard>
    );
};

export default LikesPieChart;
