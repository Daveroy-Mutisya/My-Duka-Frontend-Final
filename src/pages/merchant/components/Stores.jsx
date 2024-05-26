import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

function Stores() {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        // Fetch access token first
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

    return (
        <div className="flex justify-center items-center h-screen">
        <div  className="max-w-full">
        <div className="store-table-container mt-[-310px]">
            <table className="store-table w-full max-w-md">
                <thead>
                    <tr>
                        <th className="px-4 py-12 text-3xl font-bold" colSpan="4">STORES</th>
                    </tr>
                    <tr>
                        <th className="px-12 py-2">ID</th>
                        <th className="px-12 py-2">Name</th>
                        <th className="px-12 py-2">Location</th>
                        <th className="px-12 py-2">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store => (
                        <tr key={store.id}>
                            <td className="border px-12 py-2">{store.id}</td>
                            <td className="border px-12 py-2">{store.name}</td>
                            <td className="border px-12 py-2">{store.location}</td>
                            <td className="border px-12 py-2">{store.image}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    </div>
    


    );
}

export default Stores;
