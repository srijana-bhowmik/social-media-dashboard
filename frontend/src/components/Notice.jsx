import { Icon } from "./Icons";

const kinds = {
    error: { box: "bg-coral-50 text-coral-700 ring-coral-500/25", icon: Icon.Alert },
    success: { box: "bg-mint-50 text-mint-700 ring-mint-500/25", icon: Icon.Check },
    warn: { box: "bg-sun-100 text-sun-700 ring-sun-500/40", icon: Icon.Info },
    info: { box: "bg-brand-50 text-brand-700 ring-brand-500/20", icon: Icon.Info },
};

const Notice = ({ kind = "info", children, className = "" }) => {
    const { box, icon: IconCmp } = kinds[kind];
    return (
        <div
            role={kind === "error" ? "alert" : "status"}
            className={`flex items-start gap-3 rounded-xl px-4 py-3 text-sm font-medium ring-1 ${box} ${className}`}
        >
            <IconCmp className="mt-0.5 size-4 shrink-0" />
            <div className="min-w-0 flex-1">{children}</div>
        </div>
    );
};

export default Notice;
