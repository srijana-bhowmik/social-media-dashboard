// ---------- Number & date formatting ----------
export const formatNumber = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? n.toLocaleString() : "0";
};

export const formatCompact = (value) =>
    new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 }).format(Number(value) || 0);

export const formatDate = (value) =>
    new Date(value).toLocaleDateString(undefined, { day: "numeric", month: "short" });

export const formatDateLong = (value) =>
    new Date(value).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

// ---------- Platform identity ----------
const PLATFORMS = {
    facebook: { label: "Facebook", color: "#3f73d9" },
    instagram: { label: "Instagram", color: "#d9488f" },
    x: { label: "X", color: "#14232a" },
};

const FALLBACK_COLORS = ["#12898f", "#f4b63f", "#5967c9", "#ef7a5a", "#34b78f"];

export const platformKey = (platform) => {
    const key = String(platform || "").toLowerCase().trim();
    return key === "twitter" || key === "x" ? "x" : key;
};

export const platformMeta = (platform, index = 0) => {
    const key = platformKey(platform);
    const known = PLATFORMS[key];
    return {
        key,
        label: known ? known.label : key ? key.charAt(0).toUpperCase() + key.slice(1) : "Unknown",
        color: known ? known.color : FALLBACK_COLORS[index % FALLBACK_COLORS.length],
    };
};
