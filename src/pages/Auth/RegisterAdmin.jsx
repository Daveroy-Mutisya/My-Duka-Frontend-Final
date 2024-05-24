import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BASE_URL = 'https://deploying-myduka-backend.onrender.com';
const INVITE_REGISTER_TOKEN = "JE5U5_L0V35_U"; // Added const keyword

const RegisterAdmin = () => {
    const { id } = useParams(); // Get store ID from URL
    const [token, setToken] = useState(INVITE_REGISTER_TOKEN); // Default to INVITE_REGISTER_TOKEN
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('image', image);

        try {
            const response = await fetch(
                `${BASE_URL}/store/${id}/register-admin?token=${token}`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                navigate('/login'); // Redirect to login page after successful registration
            } else {
                setError(data.error || 'An error occurred. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container-9xl  max-w-screen-lg mx-auto p-4 bg-gray-300 border p-2 rounded-[12px]">
           <h1 className='text-center mb-4 font-body text-6xl font-normal text-Heading font-darker-grotesque text-gray-800'>MyDuk
            <span className='relative right-15 w-1 h-2 font-darker-grotesque font-normal text-Heading text-red-600'>A</span>
            </h1>
            <h2 className="text-3xl font-body font-darker-grotesque max-w-screen-lg font-medium text-red-600 mb-4">REGISTER AS ADMIN</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-max ">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold font-darker-grotesque text-4xl text-gray-700">Name</label>
                    <input
                        type="text"
                        id="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm bg-white text-gray-800"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold font-darker-grotesque text-3.5xl text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-semibold font-darker-grotesque text-3.5xl text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-semibold font-darker-grotesque text-3.5xl text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-semibold font-darker-grotesque text-4.5xl text-gray-700">Profile Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black"
                        accept="image/*"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400">
                        Register
                    </button>
                </div>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default RegisterAdmin;
