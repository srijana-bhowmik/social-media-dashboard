import { Link } from "react-router-dom";
import { buttonClass } from "./Button";

const EmptyState = ({ icon: IconCmp, title, message, actionLabel, actionTo, className = "" }) => (
    <div className={`flex flex-col items-center justify-center px-4 py-10 text-center ${className}`}>
        {IconCmp && (
            <span className="mb-4 grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <IconCmp className="size-6" />
            </span>
        )}
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        {message && <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted">{message}</p>}
        {actionLabel && actionTo && (
            <Link to={actionTo} className={buttonClass("primary", "sm", "mt-5")}>
                {actionLabel}
            </Link>
        )}
    </div>
);

export const Skeleton = ({ className = "" }) => (
    <div className={`animate-pulse rounded-xl bg-line/70 ${className}`} aria-hidden="true" />
);

export default EmptyState;
