export const BASE_URL='https://deploying-myduka-backend.onrender.com';
import React, { useState } from 'react';
import AdminSideBar from './AdminSideBar';

const AddPayments = () => {
    const [payments, setPayments] = useState([]);
    const [formData, setFormData] = useState({
        StoreId: '',
        Product: '',
        Status: '',
        Date: '',
        amount: '',
        method: '',
        dueDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPayments([...payments, formData]);
        setFormData({
            storeId: '',
            product: '',
            status: '',
            date: '',
            amount: '',
            method: '',
            dueDate: ''
        });
    };

    return (
        <div style={{ display: 'flex' }}>
            <AdminSideBar />
            <div style={{
                marginLeft: '250px', // Always leave space for the sidebar
                width: '100%',
                padding: '2rem',
                backgroundColor: '#FFFFFF',
                color: '#FFFFFF',
                minHeight: '100vh'
            }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ color: '#000000', fontSize: '1.5rem', fontWeight: '800' }}>Payment Records</h2>
                        <button onClick={() => document.getElementById('addPaymentForm').scrollIntoView({ behavior: 'smooth' })} style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.375rem',
                            backgroundColor: '#e53e3e',
                            color: '#FFFFFF',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            borderColor: 'transparent',
                            cursor: 'pointer',
                            outline: 'none',
                            transition: 'transform 0.2s, background-color 0.2s',
                        }}>
                            Add
                        </button>
                    </div>
                    <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0', backgroundColor: '#2d3748', color: '#FFFFFF' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
                                    {['Store ID', 'Product', 'Status', 'Date', 'Amount', 'Method', 'Due Date'].map((heading) => (
                                        <th key={heading} style={{
                                            padding: '0.75rem 1.5rem',
                                            textAlign: 'left',
                                            fontSize: '0.75rem',
                                            fontWeight: '500',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em'
                                        }}>{heading}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #cbd5e0' }}>
                                        <td style={{ padding: '0.75rem 1.5rem' }}>{payment.storeId}</td>
                                        <td style={{ padding: '0.75rem 1.5rem' }}>{payment.product}</td>
                                        <td style={{ padding: '0.75rem 1.5rem' }}>{payment.status}</td>
                                        <td style={{ padding: '0.75rem 1.5rem' }}>{payment.date}</td>
                                        <td style={{ padding: '0.75rem 1.5rem' }}>{payment.amount}</td>
                                        <td style={{ padding: '0.75rem 1.5rem' }}>{payment.method}</td>
                                        <td style={{ padding: '0.75rem 1.5rem' }}>{payment.dueDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div id="addPaymentForm" style={{
                        marginTop: '3rem',
                        padding: '2.5rem',
                        borderRadius: '0.5rem',
                        backgroundColor: '#000000',
                        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
                    }}>
                        <h2 style={{ color: '#FFFFFF', textAlign: 'center', fontSize: '2rem', fontWeight: '800' }}>Add New Payment</h2>
                        <form style={{ marginTop: '2rem', display: 'grid', gridGap: '1.5rem' }} onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                {['storeId', 'product', 'status', 'date', 'amount', 'method', 'dueDate'].map((field, index) => (
                                    <div key={index}>
                                        <label htmlFor={field} className="sr-only" style={{ color: '#FFFFFF' }}>{field}</label>
                                        <input id={field} name={field} type="text" required value={formData[field]} onChange={handleChange} style={{
                                            appearance: 'none',
                                            borderRadius: '0.375rem',
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderColor: '#FFFFFF',
                                            backgroundColor: '#FFFFFF',
                                            color: '#000000',
                                            outline: 'none',
                                            fontSize: '0.875rem',
                                            lineHeight: '1.25rem'
                                        }} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} />
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button type="submit" style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.375rem',
                                    backgroundColor: '#e53e3e',
                                    color: '#FFFFFF',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    borderColor: 'transparent',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    transition: 'transform 0.2s, background-color 0.2s'
                                }}>
                                    Add Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPayments;