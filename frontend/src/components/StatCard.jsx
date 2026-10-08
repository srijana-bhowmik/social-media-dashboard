import { formatNumber } from "../utils/format";

const tones = {
    brand: "bg-brand-50 text-brand-600",
    sun: "bg-sun-100 text-sun-700",
    coral: "bg-coral-50 text-coral-700",
    iris: "bg-iris-50 text-iris-500",
};

const StatCard = ({ title, value, icon: IconCmp, tone = "brand" }) => {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-line">
            {IconCmp && (
                <span className={`grid size-10 place-items-center rounded-xl ${tones[tone]}`}>
                    <IconCmp className="size-5" />
                </span>
            )}
            <p className="mt-4 text-sm font-medium text-muted">{title}</p>
            <p className="mt-1 font-display text-3xl font-semibold tabular-nums text-ink">{formatNumber(value)}</p>
        </div>
    );
};

export default StatCard;
