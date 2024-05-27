import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Chart from 'chart.js/auto';
import MerchantSideBar from "../MerchantSideBar";

export const BASE_URL = 'https://deploying-myduka-backend.onrender.com';

function ViewPerformanceProduct() {
    const { store_id } = useParams();
    const [performance, setPerformance] = useState(null);
    const [error, setError] = useState('');
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                const response = await fetch(`https://deploying-myduka-backend.onrender.com/store/1/performance/product`, {
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
            const ctx = chartRef.current;

            // Destroy the existing chart instance if it exists
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            // Create a new chart instance
            chartInstance.current = new Chart(ctx, {
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

        // Cleanup function to destroy the chart instance on unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [performance]);

    return (
        <div className="flex flex-col lg:flex-row">
        <MerchantSideBar />
        <div className="flex-grow">
            <div className="container mx-auto flex flex-col px-4 py-8">
                <h1 className="text-4xl font-bold mb-4">Product Performance</h1>
                {error && <p className="text-red-500">{error}</p>}
                {performance ? (
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">{performance.store_name}</h2>
                        <canvas id="performanceChart" ref={chartRef}></canvas>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    </div>
    );
}

export default ViewPerformanceProduct;