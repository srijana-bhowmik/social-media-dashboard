import { useEffect, useMemo, useState } from "react";
import API, { authConfig } from "../services/api";
import ChartCard from "./ChartCard";
import EmptyState, { Skeleton } from "./EmptyState";
import { Icon } from "./Icons";
import { formatDateLong, formatNumber } from "../utils/format";

const Metric = ({ value }) =>
    value === null || value === undefined ? (
        <span className="italic text-muted" title="Not provided by the platform API">
            N/A
        </span>
    ) : (
        formatNumber(value)
    );

const Delta = ({ value }) => {
    if (!value) return null;
    const up = value > 0;
    return (
        <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
                up ? "bg-mint-50 text-mint-700" : "bg-coral-50 text-coral-700"
            }`}
        >
            {up ? "+" : "-"}
            {formatNumber(Math.abs(value))}
        </span>
    );
};

const MetricsTable = ({ accountId, accountLabel, className = "" }) => {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!accountId) {
            return;
        }
        let active = true;
        setLoading(true);
        const fetchMetrics = async () => {
            try {
                const res = await API.get(`/metrics/${accountId}`, authConfig());
                if (active) setMetrics(res.data);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                if (active) setLoading(false);
            }
        }
        fetchMetrics();
        return () => {
            active = false;
        };
    }, [accountId]);

    // Oldest → newest to compute change, then show the latest 8 with newest first
    const rows = useMemo(() => {
        const asc = [...metrics].sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
        return asc
            .map((metric, i) => ({
                ...metric,
                delta: i > 0 ? Number(metric.followers) - Number(asc[i - 1].followers) : 0,
            }))
            .slice(-8)
            .reverse();
    }, [metrics]);

    const th = "pb-3 pr-4 text-sm font-semibold text-muted";

    let body;
    if (loading && accountId) {
        body = <Skeleton className="h-64" />;
    } else if (rows.length === 0) {
        body = (
            <EmptyState
                icon={Icon.Dashboard}
                title="No metrics recorded yet"
                message="Entries will show up here as soon as your account is synced."
            />
        );
    } else {
        body = (
            <>
                <div className="-mx-2 overflow-x-auto px-2">
                    <table className="w-full min-w-[34rem] text-left text-sm">
                        <thead>
                            <tr>
                                <th className={th}>Date</th>
                                <th className={`${th} text-right`}>Followers</th>
                                <th className={`${th} text-right`}>Likes</th>
                                <th className={`${th} text-right`}>Comments</th>
                                <th className={`${th} text-right`}>Shares</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((metric) => (
                                <tr
                                    key={metric.id}
                                    className="border-t border-line/70 transition-colors hover:bg-brand-50/60"
                                >
                                    <td className="py-3.5 pr-4 font-medium text-ink">
                                        {formatDateLong(metric.recorded_at)}
                                    </td>
                                    <td className="py-3.5 pr-4 text-right tabular-nums text-ink">
                                        <span className="inline-flex items-center justify-end gap-2">
                                            <Delta value={metric.delta} />
                                            <span className="font-semibold">{formatNumber(metric.followers)}</span>
                                        </span>
                                    </td>
                                    <td className="py-3.5 pr-4 text-right tabular-nums text-ink-soft">
                                        <Metric value={metric.likes_count} />
                                    </td>
                                    <td className="py-3.5 pr-4 text-right tabular-nums text-ink-soft">
                                        <Metric value={metric.comments_count} />
                                    </td>
                                    <td className="py-3.5 text-right tabular-nums text-ink-soft">
                                        <Metric value={metric.shares_count} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted">
                    <Icon.Info className="size-4 shrink-0" />
                    N/A means the platform doesn't provide that metric through its API.
                </p>
            </>
        );
    }

    return (
        <ChartCard
            className={className}
            title="Recent metrics"
            subtitle={accountLabel ? `Latest entries for ${accountLabel}` : "Latest entries for the selected account"}
        >
            {body}
        </ChartCard>
    );
};
export default MetricsTable;
