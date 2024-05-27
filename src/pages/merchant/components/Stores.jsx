import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import MerchantSideBar from "../MerchantSideBar";

export const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

function Stores() {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const accessToken = localStorage.getItem('token'); // Get the access token from localStorage

        if (!accessToken) {
            console.error('Access token is missing');
            return;
        }

        try {
            const decodedToken = jwtDecode(accessToken);

            // Fetch stores data from API using the access token
            fetch(`${BASE_URL}/stores`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch stores');
                }
                return response.json();
            })
            .then(data => {
                setStores(data.stores);
            })
            .catch(error => {
                console.error('Error fetching stores:', error);
            });
        } catch (error) {
            console.error('Error decoding access token:', error);
        }
    }, []);

    const handleDeleteStore = (storeId) => {
        const accessToken = localStorage.getItem('token');

        fetch(`${BASE_URL}/stores/${storeId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete store');
            }
            setStores(stores.filter(store => store.id !== storeId));
        })
        .catch(error => {
            console.error('Error deleting store:', error);
        });
    };

    return (
        <div className="flex flex-col md:flex-row">
            <MerchantSideBar />
            <div className="flex justify-center items-center h-full w-full p-4 md:p-8">
                <div className="w-full">
                    <div className="store-table-container overflow-auto">
                        <table className="store-table w-full min-w-max md:min-w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-2 py-4 md:px-4 md:py-6 text-lg md:text-3xl font-bold" colSpan="4">STORES</th>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 text-sm md:text-base">ID</th>
                                    <th className="px-4 py-2 text-sm md:text-base">Name</th>
                                    <th className="px-4 py-2 text-sm md:text-base">Location</th>
                                    <th className="px-4 py-2 text-sm md:text-base">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stores.map(store => (
                                    <tr key={store.id}>
                                        <td className="border px-4 py-2 text-sm md:text-base">{store.id}</td>
                                        <td className="border px-4 py-2 text-sm md:text-base">{store.name}</td>
                                        <td className="border px-4 py-2 text-sm md:text-base">{store.location}</td>
                                        <td className="border px-4 py-2 text-sm md:text-base">
                                            <button
                                                onClick={() => handleDeleteStore(store.id)}
                                                className="bg-red-500 text-white py-1 px-2 md:py-2 md:px-4 rounded-md text-xs md:text-sm"
                                            >
                                                Delete
                                            </button>
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
}

export default Stores;