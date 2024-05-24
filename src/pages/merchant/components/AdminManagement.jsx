import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Admin Management</h1>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Username</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map(admin => (
                        <tr key={admin.id}>
                            <td className="py-2 px-4 border-b">{admin.id}</td>
                            <td className="py-2 px-4 border-b">{admin.name}</td>
                            <td className="py-2 px-4 border-b">{admin.username}</td>
                            <td className="py-2 px-4 border-b">{admin.email}</td>
                            <td className="py-2 px-4 border-b">{admin.active ? 'Active' : 'Inactive'}</td>
                            <td className="py-2 px-4 border-b">
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
    );
};

export default AdminManagement;
