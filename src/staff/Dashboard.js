import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [formData, setFormData] = useState({
    visitor: "",
    personToSee: "",
    company: "",
    date: "",
    time: "",
    floor: "",
    room: "",
    purpose: "",
  });

  const [appointments, setAppointments] = useState([]);

  // Load staff's schedules from global storage
  useEffect(() => {
    const allSchedules = JSON.parse(localStorage.getItem("globalSchedules")) || [];
    const staffSchedules = allSchedules.filter(
      (a) => a.staff === loggedInUser?.username
    );
    setAppointments(staffSchedules);
  }, [loggedInUser?.username]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add new schedule
  const handleAdd = (e) => {
    e.preventDefault();

    const { visitor, personToSee, company, date, time, floor, room, purpose } =
      formData;

    if (
      !visitor ||
      !personToSee ||
      !company ||
      !date ||
      !time ||
      !floor ||
      !room ||
      !purpose
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      staff: loggedInUser.username,
      visitorName: visitor,
      personToSee,
      company,
      date,
      time,
      floor,
      room,
      purpose,
      status: "pending",
      createdBy: "staff",
    };

    // Save globally so admin can also view
    const allSchedules = JSON.parse(localStorage.getItem("globalSchedules")) || [];
    const updatedSchedules = [...allSchedules, newAppointment];
    localStorage.setItem("globalSchedules", JSON.stringify(updatedSchedules));

    // Update staff’s view
    const updatedMine = updatedSchedules.filter(
      (a) => a.staff === loggedInUser.username
    );
    setAppointments(updatedMine);

    // Reset form
    setFormData({
      visitor: "",
      personToSee: "",
      company: "",
      date: "",
      time: "",
      floor: "",
      room: "",
      purpose: "",
    });

    alert("Visitor schedule added successfully!");
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/staff/login");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome,{" "}
          <span className="text-blue-600">
            {loggedInUser?.username?.toUpperCase()}
          </span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      {/* Schedule Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Create New Visitor Schedule
        </h2>

        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            type="text"
            name="visitor"
            value={formData.visitor}
            onChange={handleChange}
            placeholder="Visitor Name"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="personToSee"
            value={formData.personToSee}
            onChange={handleChange}
            placeholder="Person to See"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            placeholder="Floor"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="room"
            value={formData.room}
            onChange={handleChange}
            placeholder="Room Number"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Purpose of Visit"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <div className="sm:col-span-2 lg:col-span-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg w-full transition"
            >
              Add Schedule
            </button>
          </div>
        </form>
      </div>

      {/* Appointment List */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          My Visitor Schedules
        </h2>

        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center">No visitor schedules yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Visitor
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Person to See
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Company
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Time
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Floor
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Room
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Purpose
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="px-4 py-2">{a.visitorName}</td>
                    <td className="px-4 py-2">{a.personToSee}</td>
                    <td className="px-4 py-2">{a.company}</td>
                    <td className="px-4 py-2">{a.date}</td>
                    <td className="px-4 py-2">{a.time}</td>
                    <td className="px-4 py-2">{a.floor}</td>
                    <td className="px-4 py-2">{a.room}</td>
                    <td className="px-4 py-2">{a.purpose}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          a.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
