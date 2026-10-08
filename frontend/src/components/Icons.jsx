// Lightweight inline icon set (no extra dependency needed)
const Svg = ({ className = "size-5", children, fill = "none", strokeWidth = 1.8, ...rest }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={fill === "none" ? "currentColor" : "none"}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...rest}
    >
        {children}
    </svg>
);

export const Icon = {
    Dashboard: (p) => (
        <Svg {...p}>
            <rect x="3" y="3" width="7" height="9" rx="1.5" />
            <rect x="14" y="3" width="7" height="5" rx="1.5" />
            <rect x="14" y="12" width="7" height="9" rx="1.5" />
            <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </Svg>
    ),
    Plus: (p) => (
        <Svg {...p}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v8M8 12h8" />
        </Svg>
    ),
    Users: (p) => (
        <Svg {...p}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </Svg>
    ),
    Heart: (p) => (
        <Svg {...p}>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </Svg>
    ),
    Comment: (p) => (
        <Svg {...p}>
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </Svg>
    ),
    Share: (p) => (
        <Svg {...p}>
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
        </Svg>
    ),
    Link: (p) => (
        <Svg {...p}>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </Svg>
    ),
    Logout: (p) => (
        <Svg {...p}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="m16 17 5-5-5-5M21 12H9" />
        </Svg>
    ),
    Menu: (p) => (
        <Svg {...p}>
            <path d="M4 6h16M4 12h16M4 18h16" />
        </Svg>
    ),
    Close: (p) => (
        <Svg {...p}>
            <path d="M18 6 6 18M6 6l12 12" />
        </Svg>
    ),
    Eye: (p) => (
        <Svg {...p}>
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
        </Svg>
    ),
    EyeOff: (p) => (
        <Svg {...p}>
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <path d="m2 2 20 20" />
        </Svg>
    ),
    Info: (p) => (
        <Svg {...p}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 16v-4M12 8h.01" />
        </Svg>
    ),
    Check: (p) => (
        <Svg {...p}>
            <path d="M20 6 9 17l-5-5" />
        </Svg>
    ),
    Alert: (p) => (
        <Svg {...p}>
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
            <path d="M12 9v4M12 17h.01" />
        </Svg>
    ),
    ChevronDown: (p) => (
        <Svg {...p}>
            <path d="m6 9 6 6 6-6" />
        </Svg>
    ),
    ArrowRight: (p) => (
        <Svg {...p}>
            <path d="M5 12h14M13 6l6 6-6 6" />
        </Svg>
    ),
    Trend: (p) => (
        <Svg {...p}>
            <path d="m22 7-8.5 8.5-5-5L2 17" />
            <path d="M16 7h6v6" />
        </Svg>
    ),
    Spinner: ({ className = "size-5" }) => (
        <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
    ),

    // Platform glyphs
    Instagram: (p) => (
        <Svg {...p}>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </Svg>
    ),
    Facebook: (p) => (
        <Svg {...p}>
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </Svg>
    ),
    X: (p) => (
        <Svg {...p} fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </Svg>
    ),
};

export default Icon;
