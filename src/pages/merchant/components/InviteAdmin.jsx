import React, { useState } from 'react';

const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

const InviteAdmin = () => {
    const [email, setEmail] = useState('');
    const [storeId, setStoreId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleInvite = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
    
        try {
            const loginResponse = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: 'myduka7@gmail.com',
                    password: 'Merchant1@pass'
                })
            });
    
            const { accessToken } = await loginResponse.json();
    
            const inviteResponse = await fetch(`${BASE_URL}/invite-admin`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    store_id: storeId
                })
            });
    
            if (!inviteResponse.ok) {
                throw new Error('Admin invited successfully!');
            }
    
            setMessage('Admin invited successfully');
            setEmail('');
            setStoreId('');
        } catch (error) {
            setError(error.message || 'An error occurred. Please try again.');
        }
    };
    
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="invite-admin-container-lg ">
                <h2 className="invite-admin-title text-2xl mb-4 font-bold">Invite an Admin</h2>
                <form onSubmit={handleInvite} className="invite-admin-form">
                    <div className="form-group mb-4">
                        <label htmlFor="email" className="form-label block font-bold text-red-600">Admin Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input w-full border border-gray-300 rounded-[4px] focus:border-red-700 font-semibold"
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="storeId" className="form-label block font-bold text-red-600">Store ID</label>
                        <input
                            type="text"
                            id="storeId"
                            value={storeId}
                            onChange={(e) => setStoreId(e.target.value)}
                            className="form-input w-full border border-gray-300 rounded-[4px] focus:border-red-700 font-semibold"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="invite-admin-button bg-black text-white font-semibold px-4 py-2 rounded-[4px] hover:bg-red-700">
                            Send Invite
                        </button>
                    </div>
                </form>
                {message && <p className="invite-admin-message invite-admin-success text-lime-700 font-bold">{message}</p>}
                {error && <p className="invite-admin-message invite-admin-error text-red-600 font-bold">{error}</p>}
            </div>
        </div>
    );
};

export default InviteAdmin;
