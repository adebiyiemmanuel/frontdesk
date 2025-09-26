import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";

function Home() {
  const [checkIns, setCheckIns] = useState(0);
  const [appointments, setAppointments] = useState(0);
  const [todaySchedules, setTodaySchedules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCheckIns = JSON.parse(localStorage.getItem("checkIns") || "[]");
    const storedSchedules = JSON.parse(localStorage.getItem("schedules") || "[]");

    setCheckIns(storedCheckIns.length);
    setAppointments(storedSchedules.length);

    const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

    // only first 3 schedules today
    const todayList = storedSchedules.filter((s) => s.date === today).slice(0, 3);
    setTodaySchedules(todayList);

    const handler = () => {
      const updatedCheckIns = JSON.parse(localStorage.getItem("checkIns") || "[]");
      const updatedSchedules = JSON.parse(localStorage.getItem("schedules") || "[]");
      setCheckIns(updatedCheckIns.length);
      setAppointments(updatedSchedules.length);

      const today = new Date().toLocaleDateString("en-CA");
      setTodaySchedules(updatedSchedules.filter((s) => s.date === today).slice(0, 3));
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Analytics boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-400 text-center p-10 rounded-md shadow-md w-64">
          <h3 className="font-medium">Total check-ins</h3>
          <p className="text-2xl font-bold mt-2 text-black">
            <CountUp end={checkIns} duration={2} />
          </p>
        </div>

        <div className="bg-gray-400 text-center p-10 rounded-md shadow-md w-64">
          <h3 className="font-medium">Scheduled Appointments</h3>
          <p className="text-2xl font-bold mt-2 text-black">
            <CountUp end={appointments} duration={2} />
          </p>
        </div>
      </div>

      {/* Today’s Appointments */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Today’s Appointments </h2>
          <button
            onClick={() => navigate("/report")}
            className="text-blue-600 hover:underline"
          >
            View All
          </button>
        </div>
        {todaySchedules.length === 0 ? (
          <p className="text-gray-500">No appointments for today</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium">Visitor</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Person to See</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Time</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {todaySchedules.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2">{item.visitorName}</td>
                    <td className="px-4 py-2">{item.personToSee}</td>
                    <td className="px-4 py-2">
                      {new Date(`1970-01-01T${item.time}`).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td className="px-4 py-2">{item.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
