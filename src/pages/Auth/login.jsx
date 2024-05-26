import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const refreshTokenRef = useRef();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const response = await fetch('http://127.0.0.1:5000/refresh-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Error: ' + response.statusText);
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      if (data.refresh_token) {
        localStorage.setItem('refreshToken', data.refresh_token);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const expiresIn = decodedToken.exp * 1000 - new Date().getTime();
        setTimeout(refreshToken, expiresIn - 60000);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error logging in');
      }

      const data = await response.json();
      if (data.access_token && data.refresh_token) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        let decodedToken;
        try {
          decodedToken = jwtDecode(data.access_token);
        } catch (error) {
          console.error("Invalid token", error);
          return;
        }
        localStorage.setItem('role', decodedToken.sub.role);

        if (decodedToken.sub.role === 'merchant') {
          navigate('/merchant/dashboard');
        } else if (decodedToken.sub.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (decodedToken.sub.role === 'clerk') {
          navigate('/clerk/dashboard');
        } else {
          throw new Error('Invalid role');
        }
      } else {
        console.error('Access token or refresh token is missing in the response');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='flex flex-col p-6 w-full max-w-md bg-white rounded-lg max-h-96 shadow-md rounded-[12px]'>
                <h1 className='text-center mb-4 font-body text-6xl font-normal font-light text-Heading font-darker-grotesque text-black'>MyDuk
                    <span className='relative right-15 w-1 h-2 font-darker-grotesque font-light text-Heading text-red-600'>A</span>
                </h1>
                <p className='text-center text-2xl font-darker-grotesque font-semibold text-black mb-4'>Let's Keep the Momentum Going</p>
                <form className='flex flex-col space-y-6' onSubmit={handleSubmit}>
                    <input
                        className='border p-2 rounded-[8px] outline-none text-Heading font-medium text-gray-800 bg-opacity-100 bg-white'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className='border p-2 rounded-[8px] outline-none text-Heading font-medium text-gray-800 bg-opacity-100 bg-white flex items-center'>
                        <input
                            className='text-Heading pr-10 outline-none text-gray-800 bg-white flex-grow'
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className='pr-3 flex items-center text-sm leading-5 text-red-600'>
                            {passwordVisible ? (
                                <PiEyeLight className='fill-Heading' onClick={togglePasswordVisibility} />
                            ) : (
                                <PiEyeSlash className='fill-Heading' onClick={togglePasswordVisibility} />
                            )}
                        </div>
                    </div>
                    <button
                        className='bg-gray-1000 text-primary-light p-2 rounded-[8px] mt-4 hover:bg-red-600 font-darker-grotesque font-semibold hover:text-white text-xl'
                        type="submit"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
  );
};

export default Login;
