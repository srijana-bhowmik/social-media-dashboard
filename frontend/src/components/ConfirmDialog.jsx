import { useEffect } from "react";
import Button from "./Button";

const ConfirmDialog = ({
    open,
    title,
    message,
    confirmLabel = "Confirm",
    tone = "danger",
    busy = false,
    onConfirm,
    onCancel,
}) => {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && !busy && onCancel();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, busy, onCancel]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[70] grid place-items-center p-5">
            <div
                className="animate-fade absolute inset-0 bg-petrol-950/50 backdrop-blur-sm"
                onClick={() => !busy && onCancel()}
                aria-hidden="true"
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
                className="animate-pop relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-lift"
            >
                <h2 id="confirm-title" className="font-display text-xl font-semibold text-ink">
                    {title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{message}</p>
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="secondary" size="sm" onClick={onCancel} disabled={busy} autoFocus>
                        Cancel
                    </Button>
                    <Button variant={tone} size="sm" onClick={onConfirm} loading={busy}>
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
