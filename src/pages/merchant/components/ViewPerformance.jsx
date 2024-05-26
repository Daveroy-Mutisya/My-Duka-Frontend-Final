import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from 'chart.js/auto';
import MerchantSideBar from "../MerchantSideBar";

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

    useEffect(() => {
        if (performance) {
            const ctx = document.getElementById('performanceChart');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Total Revenue', 'Total Profit'],
                    datasets: [{
                        label: 'Performance',
                        data: [performance.total_revenue, performance.total_profit],
                        backgroundColor: ['#FF6384', '#36A2EB'],
                        borderColor: ['#FF6384', '#36A2EB'],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [performance]);

    return (
        <div className="flex">
            <MerchantSideBar />
            <div className="flex-grow">
                <div className="container mx-auto flex flex-col h-full px-4 py-8">
                    <h1 className="text-4xl font-bold mb-4">Store Performance</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    {performance ? (
                        <div className="flex-grow bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-2xl font-bold mb-4">{performance.store_name}</h2>
                            <canvas id="performanceChart"></canvas>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ViewPerformance;
