import { useEffect, useRef, useState } from "react";
import RippleArt from "./RippleArt";

// Counts up once on load (and smoothly when the value changes). Skipped for reduced-motion users.
const useCountUp = (target, duration = 1100) => {
    const [value, setValue] = useState(0);
    const current = useRef(0);

    useEffect(() => {
        const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            current.current = target;
            setValue(target);
            return;
        }
        const from = current.current;
        const start = performance.now();
        let raf;
        const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const next = Math.round(from + (target - from) * eased);
            current.current = next;
            setValue(next);
            if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, duration]);

    return value;
};

const HeroStat = ({ followers, accounts }) => {
    const total = Number(followers) || 0;
    const shown = useCountUp(total);
    const count = Number(accounts) || 0;

    return (
        <section className="relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden rounded-3xl bg-linear-to-br from-petrol-900 via-petrol-800 to-brand-600 p-7 text-white shadow-lift sm:p-8">
            <RippleArt className="pointer-events-none absolute -right-28 -top-24 w-[28rem] text-white/25" />

            <div className="relative">
                <p className="text-sm font-medium text-brand-100">Total followers</p>
                <p
                    className="mt-3 font-display text-5xl font-semibold tabular-nums sm:text-6xl"
                    aria-label={`${total.toLocaleString()} followers`}
                >
                    {shown.toLocaleString()}
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-100/90">
                    {count > 0
                        ? `Across ${count} connected ${count === 1 ? "account" : "accounts"}.`
                        : "Connect an account to start tracking your audience."}
                </p>
            </div>

            <span className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
                <span className="size-2 rounded-full bg-sun-500" />
                Refreshes every 30 seconds
            </span>
        </section>
    );
};

export default HeroStat;
