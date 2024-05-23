import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

const AdminDashboard = () => {
    const [payments, setPayments] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Fetch all payments
        fetch(`${BASE_URL}/store/all/payments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => setPayments(data))
        .catch(error => console.error('Error fetching payments:', error));

        // Fetch all requests
        fetch(`${BASE_URL}/store/all/requests`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => setRequests(data.requests))
        .catch(error => console.error('Error fetching requests:', error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <h3 className="text-xl font-bold mb-2">Payments</h3>
            <ul>
                {payments.map((payment) => (
                    <li key={payment.id}>{payment.method}: {payment.amount}</li>
                ))}
            </ul>
            <h3 className="text-xl font-bold mb-2">Requests</h3>
            <ul>
                {requests.map((request) => (
                    <li key={request.id}>
                        {request.product_name} - {request.quantity} - {request.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
