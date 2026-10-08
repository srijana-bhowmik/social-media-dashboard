import { useEffect } from "react";
import { Icon } from "./Icons";

const Toast = ({ message, kind = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    const isError = kind === "error";

    return (
        <div
            role="status"
            aria-live="polite"
            className="animate-pop fixed bottom-6 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-xl bg-petrol-900 py-3 pl-4 pr-3 text-sm font-medium text-white shadow-lift"
        >
            <span
                className={`grid size-5 place-items-center rounded-full ${
                    isError ? "bg-coral-500 text-petrol-950" : "bg-mint-500 text-petrol-950"
                }`}
            >
                {isError ? <Icon.Close className="size-3" strokeWidth={3} /> : <Icon.Check className="size-3" strokeWidth={3} />}
            </span>
            {message}
            <button
                onClick={onClose}
                aria-label="Dismiss"
                className="grid size-6 place-items-center rounded-md text-white/70 transition hover:bg-white/10 hover:text-white"
            >
                <Icon.Close className="size-4" />
            </button>
        </div>
    );
};

export default Toast;
