import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

// App shell: fixed sidebar on desktop, slide-in drawer on mobile
const Layout = ({ title, subtitle, children }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <div className="min-h-screen lg:pl-72">
            {/* Desktop sidebar */}
            <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 lg:block">
                <Sidebar />
            </aside>

            {/* Mobile drawer */}
            <div
                onClick={() => setOpen(false)}
                aria-hidden="true"
                className={`fixed inset-0 z-40 bg-petrol-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
                    open ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />
            <aside
                aria-hidden={!open}
                className={`fixed inset-y-0 left-0 z-50 w-72 transition-[transform,visibility] duration-300 ease-out lg:hidden ${
                    open ? "visible translate-x-0" : "invisible -translate-x-full"
                }`}
            >
                <Sidebar closeSidebar={() => setOpen(false)} />
            </aside>

            <Navbar title={title} subtitle={subtitle} onMenu={() => setOpen(true)} />

            <main className="mx-auto w-full max-w-[1280px] px-5 pb-14 pt-6 sm:px-8 lg:px-10">{children}</main>
        </div>
    );
};

export default Layout;
