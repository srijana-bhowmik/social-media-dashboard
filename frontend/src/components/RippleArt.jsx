// Decorative concentric rings; colour comes from the parent's text colour
const RippleArt = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 400 400" fill="none" aria-hidden="true">
        {[56, 96, 136, 176, 216, 256].map((r, i) => (
            <circle
                key={r}
                cx="200"
                cy="200"
                r={r}
                stroke="currentColor"
                strokeOpacity={0.55 - i * 0.08}
                strokeWidth="1.5"
            />
        ))}
        <circle cx="200" cy="200" r="12" fill="currentColor" />
    </svg>
);

export default RippleArt;
