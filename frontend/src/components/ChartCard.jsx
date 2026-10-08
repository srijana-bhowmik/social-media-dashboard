// Surface used by every chart and table
const ChartCard = ({ title, subtitle, action, children, className = "" }) => (
    <section className={`rounded-2xl bg-white p-6 shadow-card ring-1 ring-line ${className}`}>
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
                <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
                {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
            </div>
            {action}
        </div>
        {children}
    </section>
);

export default ChartCard;
