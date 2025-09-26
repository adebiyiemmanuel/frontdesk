import React, { useState, useEffect } from "react";

const Report = () => {
  const [activeTab, setActiveTab] = useState("checkins");

  const [checkIns, setCheckIns] = useState([]);
  const [schedules, setSchedules] = useState([]);

  // pagination states
  const [checkInPage, setCheckInPage] = useState(1);
  const [schedulePage, setSchedulePage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const storedCheckIns = JSON.parse(localStorage.getItem("checkIns") || "[]");
    const storedSchedules = JSON.parse(localStorage.getItem("schedules") || "[]");
    setCheckIns(storedCheckIns);
    setSchedules(storedSchedules);
  }, []);

  // pagination logic for checkins
  const totalCheckInPages = Math.ceil(checkIns.length / recordsPerPage);
  const indexOfLastCheckIn = checkInPage * recordsPerPage;
  const indexOfFirstCheckIn = indexOfLastCheckIn - recordsPerPage;
  const currentCheckIns = checkIns.slice(indexOfFirstCheckIn, indexOfLastCheckIn);

  // pagination logic for schedules
  const totalSchedulePages = Math.ceil(schedules.length / recordsPerPage);
  const indexOfLastSchedule = schedulePage * recordsPerPage;
  const indexOfFirstSchedule = indexOfLastSchedule - recordsPerPage;
  const currentSchedules = schedules.slice(indexOfFirstSchedule, indexOfLastSchedule);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-t ${
            activeTab === "checkins"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("checkins")}
        >
          Check-ins
        </button>
        <button
          className={`px-4 py-2 rounded-t ${
            activeTab === "schedules"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("schedules")}
        >
          Schedules
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "checkins" && (
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4">All Check-ins</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Visitor</th>
                  <th className="py-2 px-4">Whom to See</th>
                  <th className="py-2 px-4">From</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Floor</th>
                  <th className="py-2 px-4">Purpose</th>
                  <th className="py-2 px-4">Time</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentCheckIns.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      No check-ins recorded.
                    </td>
                  </tr>
                ) : (
                  currentCheckIns.map((c) => (
                    <tr key={c.id} className="border-b">
                      <td className="py-2 px-4">{c.visitor}</td>
                      <td className="py-2 px-4">{c.employee}</td>
                      <td className="py-2 px-4">{c.company}</td>
                      <td className="py-2 px-4">{c.date}</td>
                      <td className="py-2 px-4">{c.floor}</td>
                      <td className="py-2 px-4">{c.purpose}</td>
                      <td className="py-2 px-4">{c.time}</td>
                      <td className="py-2 px-4">{c.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          {totalCheckInPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              <button
                disabled={checkInPage === 1}
                onClick={() => setCheckInPage((prev) => prev - 1)}
                className={`px-3 py-1 rounded ${
                  checkInPage === 1
                    ? "bg-gray-200 text-gray-500"
                    : "bg-blue-500 text-white"
                }`}
              >
                Prev
              </button>
              <span className="px-3 py-1">
                {checkInPage} / {totalCheckInPages}
              </span>
              <button
                disabled={checkInPage === totalCheckInPages}
                onClick={() => setCheckInPage((prev) => prev + 1)}
                className={`px-3 py-1 rounded ${
                  checkInPage === totalCheckInPages
                    ? "bg-gray-200 text-gray-500"
                    : "bg-blue-500 text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "schedules" && (
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4">All Schedulesss</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Visitor</th>
                  <th className="py-2 px-4">Person to Sees</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Time</th>
                  <th className="py-2 px-4">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {currentSchedules.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No schedules recorded.
                    </td>
                  </tr>
                ) : (
                  currentSchedules.map((s) => (
                    <tr key={s.id} className="border-b">
                      <td className="py-2 px-4">{s.visitorName}</td>
                      <td className="py-2 px-4">{s.personToSee}</td>
                      <td className="py-2 px-4">{s.date}</td>
                      <td className="py-2 px-4">{s.time}</td>
                      <td className="py-2 px-4">{s.purpose}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          {totalSchedulePages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              <button
                disabled={schedulePage === 1}
                onClick={() => setSchedulePage((prev) => prev - 1)}
                className={`px-3 py-1 rounded ${
                  schedulePage === 1
                    ? "bg-gray-200 text-gray-500"
                    : "bg-blue-500 text-white"
                }`}
              >
                Prev
              </button>
              <span className="px-3 py-1">
                {schedulePage} / {totalSchedulePages}
              </span>
              <button
                disabled={schedulePage === totalSchedulePages}
                onClick={() => setSchedulePage((prev) => prev + 1)}
                className={`px-3 py-1 rounded ${
                  schedulePage === totalSchedulePages
                    ? "bg-gray-200 text-gray-500"
                    : "bg-blue-500 text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Report;
