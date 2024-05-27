export const BASE_URL='https://deploying-myduka-backend.onrender.com';

import React, { useState } from 'react';
import AdminSideBar from './AdminSideBar';
import { Link } from 'react-router-dom';

const AddClerk = () => {
    const [clerks, setClerks] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        image: '',
        role: 'clerk'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setClerks([...clerks, formData]);
        setFormData({
            name: '',
            email: '',
            username: '',
            password: '',
            image: '',
            role: 'clerk'
        });
    };

    return (
        <div style={{ display: 'flex' }}>
            <AdminSideBar />
            <div style={{
                marginLeft: '250px',
                padding: '2rem',
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem 1rem'
            }}>
                <div style={{
                    maxWidth: '50rem',
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    padding: '2.5rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                    marginBottom: '3rem'
                }}>
                    <div>
                        <h2 style={{
                            textAlign: 'center',
                            fontSize: '2rem',
                            fontWeight: '800',
                            color: 'Black'
                        }}>New Clerk Registration</h2>
                    </div>
                    <form style={{ marginTop: '2rem', display: 'grid', gridGap: '1.5rem' }} onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label htmlFor="name" className="sr-only" style={{ color: '#FFFFFF' }}>Name</label>
                                <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} style={{
                                    appearance: 'none',
                                    borderRadius: '0.375rem',
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderColor: '#cbd5e0',
                                    backgroundColor: '#edf2f7',
                                    color: '#2d3748',
                                    outline: 'none',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.25rem'
                                }} placeholder="Full Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only" style={{ color: '#FFFFFF' }}>Email</label>
                                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} style={{
                                    appearance: 'none',
                                    borderRadius: '0.375rem',
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderColor: '#cbd5e0',
                                    backgroundColor: '#edf2f7',
                                    color: '#2d3748',
                                    outline: 'none',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.25rem'
                                }} placeholder="Email Address" />
                            </div>
                            <div>
                                <label htmlFor="username" className="sr-only"style={{ color: '#FFFFFF' }}>Username</label>
                                <input id="username" name="username" type="text" required value={formData.username} onChange={handleChange} style={{
                                    appearance: 'none',
                                    borderRadius: '0.375rem',
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderColor: '#cbd5e0',
                                    backgroundColor: '#edf2f7',
                                    color: '#2d3748',
                                    outline: 'none',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.25rem'
                                }} placeholder="Username" />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only"style={{ color: '#FFFFFF' }}>Password</label>
                                <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} style={{
                                    appearance: 'none',
                                    borderRadius: '0.375rem',
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderColor: '#cbd5e0',
                                    backgroundColor: '#edf2f7',
                                    color: '#2d3748',
                                    outline: 'none',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.25rem'
                                }} placeholder="Password" />
                            </div>
                            <div>
                                <label htmlFor="image" className="sr-only"style={{ color: '#FFFFFF' }}>Image</label>
                                <input id="image" name="image" type="text" required value={formData.image} onChange={handleChange} style={{
                                    appearance: 'none',
                                    borderRadius: '0.375rem',
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderColor: '#cbd5e0',
                                    backgroundColor: '#edf2f7',
                                    color: '#2d3748',
                                    outline: 'none',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.25rem'
                                }} placeholder="Image URL" />
                            </div>
                            <div>
                                <label htmlFor="role" className="sr-only"style={{ color: '#FFFFFF' }}>Role</label>
                                <input id="role" name="role" type="text" required value={formData.role} onChange={handleChange} style={{
                                    appearance: 'none',
                                    borderRadius: '0.375rem',
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderColor: '#cbd5e0',
                                    backgroundColor: '#edf2f7',
                                    color: '#2d3748',
                                    outline: 'none',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.25rem'
                                }} placeholder="Role" readOnly />
                            </div>
                        </div>

                        <div>
                        
                        <button type="submit" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.375rem',
                                backgroundColor: '#e53e3e  ',
                                color: 'white',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                lineHeight: '1.25rem',
                                borderColor: 'transparent',
                                cursor: 'pointer',
                                outline: 'none',
                                hover: { backgroundColor: '#3182ce' }
                            }}>
                                Register
                            </button>

                           
                    
                        
                        </div>
                    </form>
                </div>

                <ClerksTable clerks={clerks} />
            </div>
        </div>
    );
};

const ClerksTable = ({ clerks }) => {
    return (
        <div style={{
            maxWidth: '50rem',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem'
        }}>
            <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: '#2d3748',
                marginBottom: '1.5rem'
            }}>Clerk List</h2>
            <div style={{ overflowX: 'auto' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    borderSpacing: '0'
                }}>
                    <thead style={{ backgroundColor: '#edf2f7' }}>
                        <tr>
                            {['Name', 'Email', 'Username', 'Password', 'Image', 'Role'].map((heading) => (
                                <th key={heading} style={{
                                    padding: '0.75rem 1.5rem',
                                    textAlign: 'left',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    color: '#718096',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: 'white' }}>
                        {clerks.map((clerk, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{
                                    padding: '0.75rem 1.5rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: '#2d3748'
                                }}>{clerk.name}</td>
                                <td style={{
                                    padding: '0.75rem 1.5rem',
                                    fontSize: '0.875rem',
                                    color: '#4a5568'
                                }}>{clerk.email}</td>
                                <td style={{
                                    padding: '0.75rem 1.5rem',
                                    fontSize: '0.875rem',
                                    color: '#4a5568'
                                }}>{clerk.username}</td>
                                <td style={{
                                    padding: '0.75rem 1.5rem',
                                    fontSize: '0.875rem',
                                    color: '#4a5568'
                                }}>{clerk.password}</td>
                                <td style={{
                                    padding: '0.75rem 1.5rem',
                                    fontSize: '0.875rem',
                                    color: '#4a5568'
                                }}>{clerk.image}</td>
                                <td style={{
                                    padding: '0.75rem 1.5rem',
                                    fontSize: '0.875rem',
                                    color: '#4a5568'
                                }}>{clerk.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddClerk;