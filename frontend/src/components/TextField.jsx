import { useId, useState } from "react";
import { Icon } from "./Icons";

const TextField = ({ label, type = "text", value, onChange, autoComplete, placeholder, required = true, ...rest }) => {
    const id = useId();
    const [visible, setVisible] = useState(false);
    const isPassword = type === "password";

    return (
        <div>
            <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-soft">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={isPassword && visible ? "text" : type}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    required={required}
                    className={`w-full rounded-xl border border-line bg-white px-4 py-3 text-ink shadow-sm outline-none transition placeholder:text-muted/60 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${
                        isPassword ? "pr-12" : ""
                    }`}
                    {...rest}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        aria-label={visible ? "Hide password" : "Show password"}
                        className="absolute inset-y-0 right-1.5 grid w-10 place-items-center rounded-lg text-muted transition hover:text-ink"
                    >
                        {visible ? <Icon.EyeOff className="size-5" /> : <Icon.Eye className="size-5" />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default TextField;
