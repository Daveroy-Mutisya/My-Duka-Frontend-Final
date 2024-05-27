import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MerchantSideBar from "../MerchantSideBar";

const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

const AdminManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const fetchAdmins = async () => {
        try {
            const response = await fetch(`${BASE_URL}/admins`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setAdmins(data.admins);
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('Failed to fetch admins');
        }
    };

    const handleDeactivate = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/admin/${id}/deactivate`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                fetchAdmins(); // Refresh the admin list
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('Failed to deactivate admin');
        }
    };

    const handleReactivate = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/admin/${id}/reactivate`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                fetchAdmins(); // Refresh the admin list
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('Failed to reactivate admin');
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <div className="flex flex-col md:flex-row">
            <MerchantSideBar />
            <div className="flex-grow">
                <div className="container mx-auto p-4 md:w-3/4 lg:w-2/4 border border-gray-100 rounded-[12px]">
                    <div className="container mx-auto p-4 flex items-center justify-center">
                        <h1 className="text-4xl font-darker-grotesque mb-4">Admin Management</h1>
                    </div>
                    {error && <p className="text-red-600">{error}</p>}
                    {message && <p className="text-red-600">{message}</p>}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-transparent">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-red-700">ID</th>
                                    <th className="py-2 px-4 border-b text-red-700">Name</th>
                                    <th className="py-2 px-4 border-b text-red-700">Username</th>
                                    <th className="py-2 px-4 border-b text-red-700">Email</th>
                                    <th className="py-2 px-4 border-b text-red-700">Status</th>
                                    <th className="py-2 px-4 border-b text-red-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map(admin => (
                                    <tr key={admin.id}>
                                        <td className="py-2 px-4 border-b text-black font-semibold">{admin.id}</td>
                                        <td className="py-2 px-4 border-b text-black font-semibold">{admin.name}</td>
                                        <td className="py-2 px-4 border-b text-black font-semibold">{admin.username}</td>
                                        <td className="py-2 px-4 border-b text-black font-semibold">{admin.email}</td>
                                        <td className="py-2 px-4 border-b font-semibold ">{admin.active ? 'Active' : 'Inactive'}</td>
                                        <td className="py-2 px-4 border-b font-semibold">
                                            {admin.active ? (
                                                <button
                                                    onClick={() => handleDeactivate(admin.id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                                >
                                                    Deactivate
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleReactivate(admin.id)}
                                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                                >
                                                    Reactivate
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminManagement;
