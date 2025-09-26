// App.js
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CheckIns from "./pages/Checkins";
import Schedules from "./pages/Schedules";
import Report from "./pages/Report";
import Login from "./pages/Login";

const Sidebar = ({ onLogout }) => {
  return (
    <div className="w-64 bg-blue-700 text-white flex flex-col overflow-y-auto">
      <h2 className="text-2xl font-bold p-6">Dashboard</h2>
      <nav className="flex flex-col space-y-2 px-5">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `font-semibold py-2 px-4 rounded transition ${
              isActive ? "bg-blue-500" : "bg-gray-400 hover:bg-gray-500"
            }`
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/check-ins"
          className={({ isActive }) =>
            `font-semibold py-2 px-4 rounded transition ${
              isActive ? "bg-blue-500" : "bg-gray-400 hover:bg-gray-500"
            }`
          }
        >
          CHECK-INS
        </NavLink>
        <NavLink
          to="/schedules"
          className={({ isActive }) =>
            `font-semibold py-2 px-4 rounded transition ${
              isActive ? "bg-blue-500" : "bg-gray-400 hover:bg-gray-500"
            }`
          }
        >
          SCHEDULES
        </NavLink>
        <NavLink
          to="/report"
          className={({ isActive }) =>
            `font-semibold py-2 px-4 rounded transition ${
              isActive ? "bg-blue-500" : "bg-gray-400 hover:bg-gray-500"
            }`
          }
        >
          REPORT
        </NavLink>
      </nav>
      {/* logout button */}
      <button
        onClick={onLogout}
        className="mt-auto m-5 bg-red-500 hover:bg-red-700 text-white  py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  useEffect(() => {
    const handler = () => {
      setLoggedIn(localStorage.getItem("loggedIn") === "true");
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("loggedIn", "false");
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-200">
        {loggedIn && <Sidebar onLogout={handleLogout} />}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
            {!loggedIn ? (
              <Route path="*" element={<Navigate to="/login" />} />
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/check-ins" element={<CheckIns />} />
                <Route path="/schedules" element={<Schedules />} />
                <Route path="/report" element={<Report />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
