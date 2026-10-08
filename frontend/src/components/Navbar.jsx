import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import { Icon } from "./Icons";

const Navbar = ({ title, subtitle, onMenu }) => {
    const navigate = useNavigate();
    const [confirming, setConfirming] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            <header className="sticky top-0 z-30 border-b border-line/70 bg-canvas/85 backdrop-blur">
                <div className="flex items-center gap-4 px-5 py-4 sm:px-8 lg:px-10">
                    <button
                        onClick={onMenu}
                        aria-label="Open menu"
                        className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-ink shadow-card ring-1 ring-line lg:hidden"
                    >
                        <Icon.Menu className="size-5" />
                    </button>

                    <div className="min-w-0 flex-1">
                        <h1 className="truncate font-display text-2xl font-semibold text-ink sm:text-[1.75rem]">
                            {title}
                        </h1>
                        {subtitle && <p className="truncate text-sm text-muted">{subtitle}</p>}
                    </div>

                    <button
                        onClick={() => setConfirming(true)}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-ink-soft ring-1 ring-line transition hover:bg-coral-50 hover:text-coral-700"
                    >
                        <Icon.Logout className="size-4" />
                        <span className="hidden sm:inline">Log out</span>
                    </button>
                </div>
            </header>

            <ConfirmDialog
                open={confirming}
                title="Log out?"
                message="You'll need to sign in again to see your dashboard."
                confirmLabel="Log out"
                tone="dark"
                onConfirm={logout}
                onCancel={() => setConfirming(false)}
            />
        </>
    );
};

export default Navbar;
