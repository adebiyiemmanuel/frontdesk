// Login.js
import React, { useState } from 'react';
import JDJ from "../Assets/JDJ.jpg";
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin@frontdesk' && password === 'frontdesk2025') {
      localStorage.setItem('loggedIn', 'true');
       setLoggedIn(true);
      navigate('/'); 
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-4xl overflow-hidden bg-white shadow-xl flex flex-col md:grid md:grid-cols-2">
        
        <div className="hidden lg:flex items-center justify-center bg-white shadow-md">
          <img className="object-cover w-full h-full" src={JDJ} alt="Login Illustration"/>
        </div>

       
        <div className="p-10 bg-gradient-to-b from-yellow-50 to-white">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10 underline">
            Welcome Back
          </h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-left text-gray-600 mb-1 font-bold">
                Email/Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-2 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="input your username"
                required
              />
            </div>

            <div>
              <label className="block text-left text-gray-600 mb-1 font-bold">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-3xl hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
