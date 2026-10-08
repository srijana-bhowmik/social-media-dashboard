import Layout from "../components/Layout";
import PlatformBadge from "../components/PlatformBadge";
import Button from "../components/Button";
import { Icon } from "../components/Icons";

// const BASE_URL = "https://social-media-dashboard-cvh5.onrender.com/api/auth";
const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;
const AddAccount = () => {

    const handleFacebookLogin = () => {
        const token = localStorage.getItem("token");
        window.location.assign(`${BASE_URL}/facebook?token=${token}`);    
    };

    const connectTwitter = () => {
        const token = localStorage.getItem("token");
        window.location.assign(`${BASE_URL}/twitter?token=${token}`);
    };

    const options = [
        {
            key: "meta",
            title: "Facebook & Instagram",
            description: "One sign-in connects both. Instagram is linked through your Facebook account.",
            platforms: ["facebook", "instagram"],
            onConnect: handleFacebookLogin,
        },
        {
            key: "x",
            title: "X",
            description: "Connect your X profile to track followers and engagement.",
            platforms: ["x"],
            onConnect: connectTwitter,
        },
    ];

    return (
        <Layout title="Add account" subtitle="Connect a platform to start tracking its metrics.">
            <div className="max-w-2xl space-y-4">
                {options.map((option) => (
                    <div
                        key={option.key}
                        className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-card ring-1 ring-line sm:flex-row sm:items-center"
                    >
                        <div className="flex shrink-0 items-center">
                            {option.platforms.map((p, i) => (
                                <PlatformBadge
                                    key={p}
                                    platform={p}
                                    className={i > 0 ? "-ml-3 ring-4 ring-white" : ""}
                                />
                            ))}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h2 className="font-display text-lg font-semibold text-ink">{option.title}</h2>
                            <p className="mt-0.5 text-sm leading-relaxed text-muted">{option.description}</p>
                        </div>

                        <Button onClick={option.onConnect} className="shrink-0">
                            Connect
                            <Icon.ArrowRight className="size-4" />
                        </Button>
                    </div>
                ))}

                <p className="flex items-start gap-2 px-1 pt-2 text-sm text-muted">
                    <Icon.Info className="mt-0.5 size-4 shrink-0" />
                    You'll sign in on the platform to approve access, then return to your dashboard.
                </p>
            </div>
        </Layout>
    );
};

export default AddAccount;
