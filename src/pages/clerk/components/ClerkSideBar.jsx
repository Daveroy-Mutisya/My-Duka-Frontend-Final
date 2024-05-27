import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

const ClerkSideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div>
            <IconButton onClick={toggleSidebar} style={{
                position: 'fixed',
                top: '1rem',
                left: '1rem',
                zIndex: 1000,
                color: 'Black'
            }}>
                <MenuIcon />
            </IconButton>
            <div style={{
                width: isCollapsed ? '0' : '250px',
                height: '100vh',
                backgroundColor: '#1a202c',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: isCollapsed ? '0' : '2rem 1rem',
                boxShadow: isCollapsed ? 'none' : '2px 0 5px rgba(0, 0, 0, 0.1)',
                position: 'fixed',
                top: '0',
                left: '0',
                overflow: 'hidden',
                transition: 'width 0.3s ease',
                zIndex: 999
            }}>
                {!isCollapsed && (
                    <>
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
                                Home
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
                                Add Product 
                            </Link>
                            <Link to="/admin/add-clerk" style={{
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
                                Add Requests 
                            </Link>
                        </nav>
                    </>
                )}
            </div>
        </div>
    );
};

export default ClerkSideBar;