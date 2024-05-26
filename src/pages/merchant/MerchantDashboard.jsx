import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import MerchantSideBar from './MerchantSideBar'; // Import the MerchantSideBar component

const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

export default function MerchantDashboard() {
    const [stores, setStores] = useState([]);
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
        .catch(error => console.error('Error fetching stores:', error));
    }, []);

    const handleStoreClick = (storeId) => {
        navigate(`merchant/storedetails/${storeId}`);
    };

    return (
        <div className="flex items-center justify-center">
            {isMobile ? ( // Conditionally render the sidebar based on the device type
                <MerchantSideBar />
            ) : (
                <div className="flex">
                    <MerchantSideBar />
                    <div className="invite-admin-container-lg flex flex-col items-center justify-center shadow-md" style={{ width: '600px' }}>
                        <h2 className="invite-admin-title text-2xl mb-4 font-bold">Merchant Dashboard</h2>
                        <Link to="/store-details" className="text-white bg-red-700 px-3 py-1 rounded-md inline-block mb-2 font-medium hover:bg-red-800" style={{ fontSize: '14px' }}>
                            Store Details
                        </Link>
                        <div className="grid grid-cols-2 gap-x-0 gap-y-0 justify-center">
                            {stores.map(store => (
                                <div
                                    key={store.id}
                                    className="border rounded-lg shadow-md p-4 cursor-pointer"
                                    onClick={() => handleStoreClick(store.id)}
                                    style={{ maxWidth: '150px', minWidth: '150px', marginLeft: '50px', marginRight: '70px' }} // Adjust the maximum and minimum width here
                                >
                                    <img
                                        src={store.image}
                                        alt={store.name}
                                        className="w-full h-32 object-cover rounded-t-lg"
                                    />
                                    <div className="p-2">
                                        <h3 className="text-lg font-bold">{store.name}</h3>
                                        <p className="text-gray-600">{store.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


 
