import React from "react";
import { Link } from "react-router-dom";
import "./MerchantSideBar.css";

function MerchantSideBar() {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Dashboard</h2>
            <ul className="sidebar-menu">
                <li className="sidebar-item">
                    <Link to="/View-performance" className="sidebar-link">View Perfomance</Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/Stores" className="sidebar-link">Store</Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/invite-admin" className="sidebar-link">Invite admin</Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/admin-management" className="sidebar-link">Admin Management</Link>
                </li>
            </ul>
        </div>
    );
}

export default MerchantSideBar;