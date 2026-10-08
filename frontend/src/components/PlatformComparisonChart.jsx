import { useEffect, useState } from 'react'
import API, { authConfig } from '../services/api'
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
import ChartCard from "./ChartCard";
import EmptyState, { Skeleton } from "./EmptyState";
import { Icon } from "./Icons";
import { formatCompact, formatNumber, platformMeta } from "../utils/format";
import { gridColor, tooltipStyle } from "../utils/chartTheme";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const PlatformComparisonChart = ({ className = "" }) => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComparison = async () => {
            try {
                const res = await API.get(`/dashboard/platform-comparison`, authConfig());
                setRows(
                    res.data.map((item, index) => ({
                        ...platformMeta(item.platform, index),
                        followers: Number(item.followers) || 0
                    }))
                );
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchComparison();
    }, []);

    const data = {
        labels: rows.map((row) => row.label),
        datasets: [
            {
                label: "Followers",
                data: rows.map((row) => row.followers),
                backgroundColor: rows.map((row) => row.color),
                borderRadius: 10,
                borderSkipped: false,
                maxBarThickness: 56
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
            x: { grid: { display: false }, border: { display: false } },
            y: {
                grid: { color: gridColor },
                border: { display: false },
                ticks: { maxTicksLimit: 5, callback: (value) => formatCompact(value) }
            }
        }
    };

    let body;
    if (loading) {
        body = <Skeleton className="h-64" />;
    } else if (rows.length === 0) {
        body = (
            <EmptyState
                icon={Icon.Users}
                title="Nothing to compare yet"
                message="Connect more than one platform to see them side by side."
            />
        );
    } else {
        body = (
            <div className="h-64">
                <Bar data={data} options={options} />
            </div>
        );
    }

    return (
        <ChartCard className={className} title="Followers by platform" subtitle="How your platforms stack up">
            {body}
        </ChartCard>
    );
}

export default PlatformComparisonChart
