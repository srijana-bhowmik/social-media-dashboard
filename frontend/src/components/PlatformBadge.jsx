import { Icon } from "./Icons";
import { platformMeta } from "../utils/format";

const glyphs = {
    facebook: Icon.Facebook,
    instagram: Icon.Instagram,
    x: Icon.X,
};

const PlatformBadge = ({ platform, size = "md", className = "" }) => {
    const { key, label, color } = platformMeta(platform);
    const Glyph = glyphs[key];
    const dims = size === "sm" ? "size-8 rounded-lg" : "size-11 rounded-xl";

    return (
        <span
            className={`grid shrink-0 place-items-center text-white ${dims} ${className}`}
            style={{ backgroundColor: color }}
            title={label}
        >
            {Glyph ? (
                <Glyph className={size === "sm" ? "size-4" : "size-5"} />
            ) : (
                <span className="text-sm font-bold">{label.charAt(0)}</span>
            )}
        </span>
    );
};

export default PlatformBadge;
