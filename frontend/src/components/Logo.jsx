// Brand mark: ripples spreading from a single point (reach)
const Logo = ({ tone = "light", size = 36 }) => (
    <div className="flex items-center gap-3">
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect width="40" height="40" rx="12" fill={tone === "light" ? "#f4b63f" : "#0d7378"} />
            <circle cx="20" cy="24" r="3.2" fill={tone === "light" ? "#0b2a31" : "#ffffff"} />
            <path
                d="M13 24a7 7 0 0 1 14 0"
                stroke={tone === "light" ? "#0b2a31" : "#ffffff"}
                strokeWidth="2.4"
                strokeLinecap="round"
            />
            <path
                d="M8.5 24a11.5 11.5 0 0 1 23 0"
                stroke={tone === "light" ? "#0b2a31" : "#ffffff"}
                strokeOpacity="0.55"
                strokeWidth="2.4"
                strokeLinecap="round"
            />
        </svg>
        <span
            className={`font-display text-lg font-semibold tracking-tight ${
                tone === "light" ? "text-white" : "text-ink"
            }`}
        >
            Social Dashboard
        </span>
    </div>
);

export default Logo;
