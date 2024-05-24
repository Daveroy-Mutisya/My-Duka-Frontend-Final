import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // using recharts for data gotten from the end points can be displayed in a graph format

export const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

function ViewPerformance() {
    const { store_id } = useParams();
    const [performance, setPerformance] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                const response = await fetch(`${BASE_URL}/store/${store_id}/performance`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setPerformance(data);
                } else {
                    setError(data.error);
                }
            } catch (error) {
                setError('Failed to fetch store performance');
            }
        };

        fetchPerformance();
    }, [store_id]);

    const data = performance ? [
        { name: 'Total Revenue', value: performance.total_revenue },
        { name: 'Total Profit', value: performance.total_profit },
    ] : [];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Store Performance</h1>
            {error && <p className="text-red-500">{error}</p>}
            {performance ? (
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-2xl font-bold mb-4">{performance.store_name}</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ViewPerformance;
