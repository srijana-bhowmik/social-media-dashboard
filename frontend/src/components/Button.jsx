import { Icon } from "./Icons";

const base =
    "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";

const sizes = {
    md: "px-5 py-3",
    sm: "px-3.5 py-2",
};

const variants = {
    primary: "bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:translate-y-px",
    secondary: "bg-white text-ink ring-1 ring-line hover:bg-brand-50",
    danger: "bg-coral-700 text-white hover:bg-[#962f1c]",
    dangerSoft: "bg-coral-50 text-coral-700 hover:bg-[#fadbd2]",
    dark: "bg-ink text-white hover:bg-petrol-800",
};

// Use on <Link> or <a> when a button look is needed
export const buttonClass = (variant = "primary", size = "md", extra = "") =>
    `${base} ${sizes[size]} ${variants[variant]} ${extra}`;

const Button = ({ variant = "primary", size = "md", loading = false, className = "", children, disabled, ...rest }) => (
    <button
        className={buttonClass(variant, size, className)}
        disabled={disabled || loading}
        {...rest}
    >
        {loading && <Icon.Spinner className="size-4" />}
        {children}
    </button>
);

export default Button;
