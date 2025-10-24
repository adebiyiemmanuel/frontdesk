import React, { useState, useEffect } from "react";

const Schedules = ({ role = "admin", staffName }) => {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    visitor: "",
    personToSee: "",
    company: "",
    floor: "",
    room: "",
    date: "",
    time: "",
    purpose: "",
  });
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Load schedules from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("globalSchedules") || "[]");
    setSchedules(saved);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add new schedule
  const handleSubmit = (e) => {
    e.preventDefault();
    const { visitor, personToSee, company, floor, room, date, time, purpose } =
      formData;

    if (
      !visitor ||
      !personToSee ||
      !company ||
      !floor ||
      !room ||
      !date ||
      !time ||
      !purpose
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newSchedule = {
      id: Date.now(),
      visitor,
      personToSee,
      company,
      floor,
      room,
      date,
      time,
      purpose,
      status: "pending",
      staff: role === "staff" ? staffName : "Admin",
      createdBy: role,
    };

    const updated = [...schedules, newSchedule];
    setSchedules(updated);
    localStorage.setItem("globalSchedules", JSON.stringify(updated));

    setFormData({
      visitor: "",
      personToSee: "",
      company: "",
      floor: "",
      room: "",
      date: "",
      time: "",
      purpose: "",
    });

    alert("Schedule created successfully!");
  };

  // Admin can clear all
  const handleClearAll = () => {
    if (role !== "admin") return alert("Only admin can clear schedules.");
    if (window.confirm("Are you sure you want to clear all schedules?")) {
      setSchedules([]);
      localStorage.removeItem("globalSchedules");
    }
  };

  // Mark checked in
  const handleCheckIn = (id) => {
    const updated = schedules.map((sch) => {
      if (sch.id === id) {
        const checkIns = JSON.parse(localStorage.getItem("checkIns") || "[]");
        const newCheckin = {
          id: Date.now(),
          visitor: sch.visitor,
          employee: sch.personToSee,
          company: sch.company,
          floor: sch.floor,
          room: sch.room,
          purpose: sch.purpose,
          date: sch.date,
          time: sch.time,
          status: "Checked In",
        };
        localStorage.setItem("checkIns", JSON.stringify([newCheckin, ...checkIns]));
        return { ...sch, status: "checkedIn" };
      }
      return sch;
    });
    setSchedules(updated);
    localStorage.setItem("globalSchedules", JSON.stringify(updated));
  };

  // Mark not available
  const handleNotAvailable = (id) => {
    const updated = schedules.map((sch) =>
      sch.id === id ? { ...sch, status: "notAvailable" } : sch
    );
    setSchedules(updated);
    localStorage.setItem("globalSchedules", JSON.stringify(updated));
  };

  // Filter based on date and role
  const filtered = schedules.filter((s) => {
    const matchDate = s.date === selectedDate;
    if (role === "admin") return matchDate;
    if (role === "staff") return matchDate && s.staff === staffName;
    return false;
  });

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / recordsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black mb-6">
        {role === "admin" ? " Schedule Management" : "My Staff Schedule"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <input
          type="text"
          name="visitor"
          value={formData.visitor}
          onChange={handleChange}
          placeholder="Visitor Name"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="personToSee"
          value={formData.personToSee}
          onChange={handleChange}
          placeholder="Person to See"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="floor"
          value={formData.floor}
          onChange={handleChange}
          placeholder="Floor"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="room"
          value={formData.room}
          onChange={handleChange}
          placeholder="Room Number"
          className="border rounded-md px-3 py-2"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border rounded-md px-3 py-2"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="Purpose"
          className="border rounded-md px-3 py-2"
        />
        <div className="md:col-span-2 lg:col-span-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            {role === "admin" ? "Create Schedule" : "Submit My Schedule"}
          </button>
        </div>
      </form>

  
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          View schedules for date:
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded-md px-3 py-2"
        />
      </div>

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Schedules for {selectedDate}</h2>
        {role === "admin" && (
          <button
            onClick={handleClearAll}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Clear All
          </button>
        )}
      </div>

  
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Visitor</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Company</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Person To See</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Floor</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Room</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Time</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Purpose</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Staff</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentRecords.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No schedules for this date
                </td>
              </tr>
            ) : (
              currentRecords.map((sch) => (
                <tr key={sch.id}>
                  <td className="px-4 py-3">{sch.visitor}</td>
                  <td className="px-4 py-3">{sch.company}</td>
                  <td className="px-4 py-3">{sch.personToSee}</td>
                  <td className="px-4 py-3">{sch.floor}</td>
                  <td className="px-4 py-3">{sch.room}</td>
                  <td className="px-4 py-3">{sch.date}</td>
                  <td className="px-4 py-3">{sch.time}</td>
                  <td className="px-4 py-3">{sch.purpose}</td>
                  <td className="px-4 py-3">{sch.staff}</td>
                  <td className="px-4 py-3">
                    {sch.status === "checkedIn" ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        Checked In
                      </span>
                    ) : sch.status === "notAvailable" ? (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                        Not Available
                      </span>
                    ) : role === "admin" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCheckIn(sch.id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-full"
                        >
                          Check In
                        </button>
                        <button
                          onClick={() => handleNotAvailable(sch.id)}
                          className="bg-red-400 text-white px-3 py-1 rounded-full"
                        >
                          Not Available
                        </button>
                      </div>
                    ) : (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500"
                : "bg-blue-500 text-white"
            }`}
          >
            Prev
          </button>
          <span className="px-3 py-1">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500"
                : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Schedules;
