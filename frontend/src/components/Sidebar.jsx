import { Link } from "react-router-dom";
// import {jwtDecode} from "jwt-decode"        //Its purpose is to read the data stored inside a JWT token on the frontend.

const Sidebar = ({ closeSidebar }) => {
    // const token = localStorage.getItem("token");
    // const user=token?jwtDecode(token):null;
    return ( 
        <div className="w-64 min-h-screen bg-slate-800 text-white p-6">
            <h1 className="text-2xl font-bold mb-8">
                Social Dashboard
            </h1>

            <div className="flex flex-col gap-4">
                <Link to="/dashboard" onClick={closeSidebar} className="hover:bg-slate-700 p-1 pl-2 rounded">Dashboard</Link>
                <Link to="/add-account" onClick={closeSidebar} className="hover:bg-slate-700 p-1 pl-2 rounded">Add Account</Link>
                {/* <Link to="/add-metrics">Add Metrics</Link>   */}
                <Link to="/accounts" onClick={closeSidebar} className="hover:bg-slate-700 p-1 pl-2 rounded">Accounts</Link>
            </div>
        </div>
    );
};

export default Sidebar;