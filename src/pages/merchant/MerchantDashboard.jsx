import React, { useState, useEffect } from 'react';

export default function MerchantDashboard() {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [products, setProducts] = useState([]);
    const [payments, setPayments] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://127.0.0.1:5000//stores`, {
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

    const handleStoreSelect = (storeId) => {
        setSelectedStore(storeId);

        const token = localStorage.getItem('token');

        // Fetch products for the selected store
        fetch(`http://127.0.0.1:5000/stores/${storeId}/products`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));

        // Fetch payments for the selected store
        fetch(`http://127.0.0.1:5000/stores/${storeId}/payments`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(data => setPayments(data))
        .catch(error => console.error('Error fetching payments:', error));

        // Fetch requests for the selected store
        fetch(`http://127.0.0.1:5000/stores/${storeId}/requests`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(data => setRequests(data.requests))
        .catch(error => console.error('Error fetching requests:', error));
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Merchant Dashboard</h2>
            <div className="mb-4">
                <label htmlFor="store-select" className="block text-sm font-medium text-gray-700">Select Store</label>
                <select
                    id="store-select"
                    onChange={(e) => handleStoreSelect(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Select a store</option>
                    {stores.map((store) => (
                        <option key={store.id} value={store.id}>
                            {store.name}
                        </option>
                    ))}
                </select>
            </div>
            {selectedStore && (
                <div>
                    <h3 className="text-xl font-bold mb-2">Products</h3>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
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
            )}
        </div>
    );
}
