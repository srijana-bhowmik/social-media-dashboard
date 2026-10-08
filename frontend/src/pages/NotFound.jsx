import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import RippleArt from "../components/RippleArt";
import { buttonClass } from "../components/Button";

const NotFound = () => {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
            <RippleArt className="pointer-events-none absolute left-1/2 top-1/2 w-[48rem] max-w-none -translate-x-1/2 -translate-y-1/2 text-brand-500/15" />

            <div className="relative flex flex-col items-center">
                <Logo tone="dark" />
                <p className="mt-14 font-display text-8xl font-semibold text-brand-600 sm:text-9xl">404</p>
                <h1 className="mt-4 font-display text-3xl font-semibold text-ink">We couldn't find that page</h1>
                <p className="mt-2 max-w-sm text-base leading-relaxed text-muted">
                    The link may be broken, or the page may have moved.
                </p>
                <Link to="/dashboard" className={buttonClass("primary", "md", "mt-8")}>
                    Back to dashboard
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
