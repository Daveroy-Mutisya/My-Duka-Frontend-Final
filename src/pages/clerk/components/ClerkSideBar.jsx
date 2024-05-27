import React from 'react';
import { Link } from 'react-router-dom';

const ClerkSideBar = () => {
    return (
        <div style={{
            width: '250px',
            height: '100vh',
            backgroundColor: '#1a202c',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem 1rem',
            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
            position: 'fixed',
            top: '0',
            left: '0'
        }}>
            <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                marginBottom: '2rem'
            }}>Clerk PANEL</h2>
            <nav style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <Link to="/clerk/dashboard" style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: 'white',
                    backgroundColor: '#e53e3e',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'background-color 0.3s ease'
                }}>
                    Products
                </Link>
                <Link to="/clerk/register-product" style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: 'white',
                    backgroundColor: '#e53e3e',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'background-color 0.3s ease'
                }}>
                    Addproducts
                </Link>
                <Link to="/clerk/addrequest" style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: 'white',
                    backgroundColor: '#e53e3e',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'background-color 0.3s ease'
                }}>
                    Request
                </Link>
                <Link to="/admin/add-payments" style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: 'white',
                    backgroundColor: '#e53e3e',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'background-color 0.3s ease'
                }}>
                    Add Payment
                </Link>
            </nav>
        </div>
    );
};

export default ClerkSideBar;