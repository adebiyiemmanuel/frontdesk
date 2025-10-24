import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import CheckIns from "./pages/Checkins";
import Schedules from "./pages/Schedules";
import Report from "./pages/Report";
import Login from "./pages/Login";
import StaffLogin from "./staff/StaffLogin";
import StaffDashboard from "./staff/Dashboard";
import ProtectedRoute from "./staff/ProtectedRoute";

const Sidebar = ({ onLogout }) => (
  <div className="w-64 bg-blue-700 text-white flex flex-col overflow-y-auto">
    <h2 className="text-2xl font-bold p-6"> Dashboard</h2>
    <nav className="flex flex-col space-y-2 px-5">
      <NavLink to="/home" end className={({ isActive }) =>
        `font-semibold py-2 px-4 rounded transition ${
          isActive ? "bg-blue-500" : "bg-gray-400 hover:bg-gray-500"
        }`
      }>
        HOME
      </NavLink>
      <NavLink to="/check-ins" className={({ isActive }) =>
        `font-semibold py-2 px-4 rounded transition ${
          isActive ? "bg-blue-500" : "bg-gray-400 hover:bg-gray-500"
        }`
      }>
        CHECK-INS
      </NavLink>
      <NavLink to="/schedules" className={({ isActive }) =>
        `font-semibold py-2 px-4 rounded transition ${
          isActive ? "bg-blue-500" : "bg-gray-400 hover:bg-gray-500"
        }`
      }>
        SCHEDULES
      </NavLink>
      <NavLink to="/report" className={({ isActive }) =>
        `font-semibold py-2 px-4 rounded transition ${
          isActive ? "bg-blue-500" : "bg-gray-400 hover:bg-gray-500"
        }`
      }>
        REPORT
      </NavLink>
    </nav>
    <button
      onClick={onLogout}
      className="mt-auto m-5 bg-red-500 hover:bg-red-700 text-white py-2 rounded"
    >
      Logout
    </button>
  </div>
);

const WelcomePage = () => (
  <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "frontdesk/src/Assets/JDJ copy.jpg", // <-- put your image in public/images
      }}
    >
    <h1 className="text-3xl font-bold mb-6">Welcome to FrontDesk System</h1>
    <div className="space-x-4">

      <p className="text-lg md:text-xl mb-8 font-light">
          Manage appointments, check-ins, and reports seamlessly.
        </p>

      <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded">Admin Login</Link>
      <Link to="/staff/login" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded">Staff Login</Link>
    </div>
  </div>
);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");

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
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />

            {loggedIn ? (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/check-ins" element={<CheckIns />} />
                <Route path="/schedules" element={<Schedules />} />
                <Route path="/report" element={<Report />} />
              </>
            ) : (
              <Route path="/admin/*" element={<Navigate to="/login" />} />
            )}

            {/* STAFF ROUTES */}
            <Route path="/staff/login" element={<StaffLogin />} />
            <Route
              path="/staff/dashboard"
              element={
                <ProtectedRoute>
                  <StaffDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
