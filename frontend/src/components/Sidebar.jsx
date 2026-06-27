import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 min-h-screen bg-slate-800 text-white p-6">
            <h1 className="text-2xl font-bold mb-8">
                Social Dashboard
            </h1>

            <div className="flex flex-col gap-4">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/add-account">Add Account</Link>
                <Link to="/add-metrics">Add Metrics</Link>
                <Link to="/accounts">Accounts</Link>
            </div>
        </div>
    );
};

export default Sidebar;