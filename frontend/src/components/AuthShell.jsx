import Logo from "./Logo";
import RippleArt from "./RippleArt";
import { Icon } from "./Icons";

const highlights = [
    "Follower growth over time, for every account",
    "Likes, comments and shares side by side",
    "Numbers that refresh automatically",
];

// Split-screen layout shared by Login, Register and Verify OTP
const AuthShell = ({ title, subtitle, children, footer }) => (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
        <aside className="relative hidden overflow-hidden bg-linear-to-br from-petrol-950 via-petrol-900 to-petrol-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <RippleArt className="pointer-events-none absolute -bottom-40 -right-40 w-[46rem] text-brand-100/25" />
            <div className="relative">
                <Logo />
            </div>
            <div className="relative max-w-md">
                <h2 className="font-display text-5xl font-semibold leading-[1.05] text-white">
                    Watch your audience grow, all in one place.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-brand-100/90">
                    Connect your social accounts and see what's working at a glance.
                </p>
                <ul className="mt-8 space-y-3.5">
                    {highlights.map((text) => (
                        <li key={text} className="flex items-center gap-3 text-brand-100">
                            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-sun-500 text-petrol-900">
                                <Icon.Check className="size-3.5" strokeWidth={3} />
                            </span>
                            {text}
                        </li>
                    ))}
                </ul>
            </div>
            <p className="relative text-sm text-brand-100/60">Facebook, Instagram and X, together.</p>
        </aside>

        <main className="flex flex-col items-center justify-center px-6 py-12 sm:px-10">
            <div className="mb-10 lg:hidden">
                <Logo tone="dark" />
            </div>
            <div className="animate-pop w-full max-w-md">
                <h1 className="font-display text-4xl font-semibold text-ink">{title}</h1>
                {subtitle && <p className="mt-2 text-base text-muted">{subtitle}</p>}
                <div className="mt-8">{children}</div>
                {footer && <div className="mt-8 text-center text-sm text-muted">{footer}</div>}
            </div>
        </main>
    </div>
);

export default AuthShell;
