// src/components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedIn'); // clear flag
    navigate('/login'); // go back to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 m-4 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
