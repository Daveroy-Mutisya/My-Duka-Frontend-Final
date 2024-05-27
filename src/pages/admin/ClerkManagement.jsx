import React, { useState } from 'react';
import AdminSideBar from './components/AdminSideBar';

const ClerkManagement = () => {
    const [clerks, setClerks] = useState([
        { id: 1, fullName: 'Teddy Maina', username: 'Teddy', email: 'mainateddy9@gmail.com', password: 'clerk1@pass', role: 'Clerk' },
        { id: 2, fullName: 'Brian Murigi', username: 'Brian', email: 'brianmurigi9@gmail.com', password: 'clerk2@pass', role: 'Clerk' },
        { id: 3, fullName: 'Victor Leyian', username: 'VLeyian', email: 'leyianv360@gmail.com', password: 'clerk3@pass', role: 'Clerk' },

    ]);

    const deleteClerk = (id) => {
        setClerks(clerks.filter(clerk => clerk.id !== id));
    };

    return (
        <div style={{ display: 'flex' }}>
            <AdminSideBar />
            <div style={{ marginLeft: '250px', padding: '2rem', width: '100%' }}>
                <h1 style={{ color: 'Black' }}></h1>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: 'black', color: 'white' }}>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Full Name</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Username</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Email Address</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Password</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Role</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clerks.map(clerk => (
                            <tr key={clerk.id} style={{ borderBottom: '1px solid black' }}>
                                <td style={{ padding: '10px' }}>{clerk.fullName}</td>
                                <td style={{ padding: '10px' }}>{clerk.username}</td>
                                <td style={{ padding: '10px' }}>{clerk.email}</td>
                                <td style={{ padding: '10px' }}>{clerk.password}</td>
                                <td style={{ padding: '10px' }}>{clerk.role}</td>
                                <td style={{ padding: '10px' }}>
                                    <button
                                        onClick={() => deleteClerk(clerk.id)}
                                        style={{
                                            backgroundColor: '#e53e3e',
                                            color: 'white',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClerkManagement;