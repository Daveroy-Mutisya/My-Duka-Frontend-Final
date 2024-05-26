import React, { useState, useEffect } from 'react';

export default function MerchantDashboard() {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [products, setProducts] = useState([]);
    const [payments, setPayments] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://127.0.0.1:5000/stores`, {
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
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="container-2xl bg-white p-6 rounded-lg shadow-md mx-4 sm:mx-auto w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 min-h-[500px]">
        <div className="flex items-center justify-center mb-4">
            <h1 className="text-black text-3xl font-normal font-darker-grotesque">MyDuk</h1>
            <span className="text-red-600 text-3xl font-normal font-darker-grotesque ml">A</span>
        </div>
        <div className='flex items-center justify-center mb-4'>
            <h2 className="text-xl font-bold mb-4">Merchant Dashboard</h2>
        </div>
        <div className="mb-4">
            <label htmlFor="store-select" className="block text-sm font-semibold text-gray-700 font-darker-grotesque">Select Store</label>
            <select
                id="store-select"
                onChange={(e) => handleStoreSelect(e.target.value)}
                className="mt-1 font-semibold block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm hover:outline-red focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-red-600 text-medium hover:bg-red-700 hover:text-red hover:bg-opacity-20"
            >
                <option value="">.....</option>
                {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                        {store.name}
                    </option>
                ))}
            </select>
        </div>
        {selectedStore && (
            <div>
                <h3 className="text-xl font-bold font-darker-grotesque mb-2">Products</h3>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
                <h3 className="text-xl font-bold font-darker-grotesque mb-2">Payments</h3>
                <ul>
                    {payments.map((payment) => (
                        <li key={payment.id}>{payment.method}: {payment.amount}</li>
                    ))}
                </ul>
                <h3 className="text-xl font-bold font-darker-grotesque mb-2">Requests</h3>
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
</div>

    );
}

 
