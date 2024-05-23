
import React, { useState, useEffect } from "react";
import "./Stores.css";
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
            fetch("/stores/", {
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
        <div className="store-table-container">
            <h2 className="store-table-title">Stores</h2>
            <table className="store-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store => (
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td>{store.location}</td>
                            <td>{store.image}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Stores;

