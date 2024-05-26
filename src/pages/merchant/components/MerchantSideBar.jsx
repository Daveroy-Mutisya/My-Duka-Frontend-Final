import React from "react";
import { Link } from "react-router-dom";
import InviteAdmin from "./InviteAdmin";
import ViewPerformance from "./ViewPerformance";
import Stores from "./Stores";
import AdminManagement from "./AdminManagement";

function MerchantSideBar() {
    return (
        <div className="sidebar bg-black text-white h-screen p-6 w-64 shadow" >
            <h2 className="sidebar-title text-2xl font-bold mb-6 text-red-500">Merchant Dashboard</h2>
            <ul className="sidebar-menu space-y-4">
                <li className="sidebar-item">
                    <Link to="/merchant/view-performance" className="sidebar-link block py-2 px-4 font-semibold rounded hover:bg-red-700 transition duration-300">
                        View Performance
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/merchant/stores" className="sidebar-link block py-2 px-4 font-semibold rounded hover:bg-red-700 transition duration-300">
                        Store
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/merchant/register" className="sidebar-link block py-2 px-4 font-semibold rounded hover:bg-red-700 transition duration-300">
                        Invite Admin
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/merchant/admin-management" className="sidebar-link block py-2 px-4 font-semibold rounded hover:bg-red-700 transition duration-300">
                        Admin Management
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default MerchantSideBar;