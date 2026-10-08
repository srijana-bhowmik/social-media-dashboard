import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import API, { authConfig } from "../services/api";
import PlatformBadge from "../components/PlatformBadge";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import EmptyState, { Skeleton } from "../components/EmptyState";
import { buttonClass } from "../components/Button";
import Button from "../components/Button";
import { Icon } from "../components/Icons";
import { platformMeta, platformKey } from "../utils/format";

const StatusChip = ({ expired }) =>
    expired ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-coral-50 px-2.5 py-1 text-xs font-semibold text-coral-700">
            <span className="size-1.5 rounded-full bg-coral-500" />
            Needs reconnecting
        </span>
    ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-50 px-2.5 py-1 text-xs font-semibold text-mint-700">
            <span className="size-1.5 rounded-full bg-mint-500" />
            Connected
        </span>
    );

const Accounts = () => {

    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pendingDelete, setPendingDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const res = await API.get("/dashboard/accounts", authConfig());
                setAccounts(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAccounts();
    }, []);

    const handleDelete = async () => {
        if (!pendingDelete) return;
        setDeleting(true);
        try {
            await API.delete(`/social-account/delete/${pendingDelete.id}`, authConfig());
            setAccounts((prev) => prev.filter((account) => account.id !== pendingDelete.id));
            setToast({ kind: "success", message: "Account disconnected." });
        } catch (error) {
            console.log(error);
            setToast({ kind: "error", message: "Couldn't disconnect the account. Try again." });
        } finally {
            setDeleting(false);
            setPendingDelete(null);
        }
    };

    const pendingName = pendingDelete
        ? pendingDelete.account_name || platformMeta(pendingDelete.platform).label
        : "";

    return (
        <Layout title="Accounts" subtitle="Manage the platforms that feed your dashboard.">
            {loading ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {[0, 1, 2].map((i) => (
                        <Skeleton key={i} className="h-44" />
                    ))}
                </div>
            ) : accounts.length === 0 ? (
                <div className="rounded-2xl bg-white shadow-card ring-1 ring-line">
                    <EmptyState
                        icon={Icon.Link}
                        title="No accounts connected yet"
                        message="Connect Facebook, Instagram or X to start tracking your audience."
                        actionLabel="Connect your first account"
                        actionTo="/add-account"
                    />
                </div>
            ) : (
                <>
                    <div className="mb-6 flex justify-end">
                        <Link to="/add-account" className={buttonClass("primary", "sm")}>
                            <Icon.Plus className="size-4" />
                            Add account
                        </Link>
                    </div>

                    <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {accounts.map((account) => {
                            const meta = platformMeta(account.platform);
                            const expired = account.status === "expired";
                            const isInstagram = platformKey(account.platform) === "instagram";

                            return (
                                <li
                                    key={account.id}
                                    className="flex flex-col rounded-2xl bg-white p-6 shadow-card ring-1 ring-line"
                                >
                                    <div className="flex items-start gap-4">
                                        <PlatformBadge platform={account.platform} />
                                        <div className="min-w-0 flex-1">
                                            <h2 className="font-display text-lg font-semibold text-ink">{meta.label}</h2>
                                            <p className="truncate text-sm text-muted">{account.account_name}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <StatusChip expired={expired} />
                                    </div>

                                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-4">
                                        {expired && (
                                            <Link to="/add-account" className={buttonClass("primary", "sm")}>
                                                Reconnect
                                            </Link>
                                        )}
                                        {isInstagram ? (
                                            <p className="text-xs leading-relaxed text-muted">
                                                Linked through Facebook. Disconnect Facebook to remove this account.
                                            </p>
                                        ) : (
                                            <Button variant="dangerSoft" size="sm" onClick={() => setPendingDelete(account)}>
                                                Disconnect
                                            </Button>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}

            <ConfirmDialog
                open={!!pendingDelete}
                title={`Disconnect ${pendingName}?`}
                message="All metrics collected for this account will be deleted too. This can't be undone."
                confirmLabel="Disconnect"
                busy={deleting}
                onConfirm={handleDelete}
                onCancel={() => setPendingDelete(null)}
            />

            {toast && <Toast key={toast.message} kind={toast.kind} message={toast.message} onClose={() => setToast(null)} />}
        </Layout>
    );
};

export default Accounts;
