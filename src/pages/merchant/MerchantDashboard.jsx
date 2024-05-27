import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import MerchantSideBar from './MerchantSideBar'; // Import the MerchantSideBar component

const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

export default function MerchantDashboard() {
    const [stores, setStores] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use the useNavigate hook from react-router-dom

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${BASE_URL}/stores`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(data => {
            if (data && data.stores) {
                setStores(data.stores);
            } else {
                console.error('Unexpected response format:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching stores:', error);
            setError('Failed to fetch stores');
        });
    }, []);

    const handleStoreClick = (storeId) => {
        navigate(`/merchant/storedetails/${storeId}`);
    };

    return (
        <div className="flex w-full h-screen">
            <div className="flex-none">
                <MerchantSideBar />
            </div>
            <div className="flex-grow flex flex-col items-center justify-center" style={{ marginTop: '-300px' }}>
                <div className="invite-admin-container-lg flex flex-col items-center justify-center  m-0.5" style={{ width: '600px' }}>
                    <h2 className="invite-admin-title text-5xl mb-4 font-bold">Merchant Dashboard</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-red-600">Store Name</th>
                                <th className="py-2 px-4 border-b text-red-600">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stores.map(store => (
                                <tr key={store.id} className="cursor-pointer" onClick={() => handleStoreClick(store.id)}>
                                    <td className="py-2 px-4 border-b">{store.name}</td>
                                    <td className="py-2 px-4 border-b">{store.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}




 
