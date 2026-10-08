import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";
import RippleArt from "./RippleArt";
import { Icon } from "./Icons";

const items = [
    { to: "/dashboard", label: "Dashboard", icon: Icon.Dashboard },
    { to: "/accounts", label: "Accounts", icon: Icon.Link },
    { to: "/add-account", label: "Add account", icon: Icon.Plus },
];

const Sidebar = ({ closeSidebar }) => {
    return (
        <div className="relative flex h-full flex-col overflow-hidden bg-petrol-900 px-5 py-6 text-white">
            <RippleArt className="pointer-events-none absolute -bottom-28 -left-28 w-80 text-brand-100/10" />

            <div className="relative flex items-center justify-between px-2">
                <Logo />
                {closeSidebar && (
                    <button
                        onClick={closeSidebar}
                        aria-label="Close menu"
                        className="grid size-9 place-items-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
                    >
                        <Icon.Close className="size-5" />
                    </button>
                )}
            </div>

            <nav className="relative mt-10 flex flex-col gap-1.5" aria-label="Main">
                {items.map(({ to, label, icon: IconCmp }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${
                                isActive
                                    ? "bg-white/12 text-white"
                                    : "text-brand-100/75 hover:bg-white/6 hover:text-white"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <IconCmp className={`size-5 ${isActive ? "text-sun-500" : ""}`} />
                                {label}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="relative mt-auto rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-white">Keep your data fresh</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-100/75">
                    Accounts marked as expired need to be reconnected to keep updating.
                </p>
                <Link
                    to="/accounts"
                    onClick={closeSidebar}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sun-500 transition hover:text-white"
                >
                    Review accounts
                    <Icon.ArrowRight className="size-4" />
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
