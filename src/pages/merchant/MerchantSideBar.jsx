import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function MerchantSideBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="md:hidden p-4 bg-white text-black flex justify-between items-center"> {/* Change background color to white */}
                <button onClick={toggleSidebar} className="text-black"> {/* Change text color to black */}
                    {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                </button>
            </div>
            <div className={`fixed inset-y-0 left-0 bg-white text-black p-6 w-64 shadow transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:flex md:flex-col h-full`}>
                {isOpen && (
                    <h2 className="sidebar-title text-2xl font-bold mb-6 text-red-500">Merchant Dashboard</h2>
                )}
                <ul className="sidebar-menu space-y-4">
                    <li className="sidebar-item">
                        <Link to="/merchant/dashboard" className="sidebar-link block py-2 px-4 font-semibold rounded hover:bg-red-700 transition duration-300" onClick={toggleSidebar}>
                            Home
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/merchant/view-performance" className="sidebar-link block py-2 px-4 font-semibold rounded hover:bg-red-700 transition duration-300" onClick={toggleSidebar}>
                            View Performance
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/merchant/stores" className="sidebar-link block py-2 px-4 font-semibold rounded hover:bg-red-700 transition duration-300" onClick={toggleSidebar}>
                            Store
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/merchant/register" className="sidebar-link block py-2 px-4 font-semibold rounded hover:bg-red-700 transition duration-300" onClick={toggleSidebar}>
                            Invite Admin
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/merchant/admin-management" className="sidebar-link block py-2 px-4 font-semibold rounded hover:bg-red-700 transition duration-300" onClick={toggleSidebar}>
                            Admin Management
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default MerchantSideBar;


