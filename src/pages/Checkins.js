import React, { useState, useEffect } from 'react';

const CheckIns = () => {
  const [newVisitor, setNewVisitor] = useState({ name: '', company: '' });
  const [visitors, setVisitors] = useState([]);
  const [checkIns, setCheckIns] = useState([]);

  const [selectedVisitor, setSelectedVisitor] = useState('');
  const [employee, setEmployee] = useState('');
  const [meetingFloor, setMeetingFloor] = useState('');
  const [meetingRoom, setMeetingRoom] = useState('');
  const [purpose, setPurpose] = useState('');
  const [checkInDate, setCheckInDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;


  const floorRooms = {
    "1st": ["Training Room", "Thinktank"],
    "2nd": ["Thinktank", "Training Room"],
    "3rd": ["zen", "Thinktank"],
    "4th": ["Chiarman's office ", "Lounge", "Confrence Room"],
  };

  // Load saved check-ins
  useEffect(() => {
    const storedCheckIns = JSON.parse(localStorage.getItem('checkIns') || '[]');
    setCheckIns(storedCheckIns);
  }, []);

  // Create visitor
  const handleCreateVisitor = () => {
    if (!newVisitor.name) return;
    const visitorObj = {
      id: Date.now(),
      name: newVisitor.name,
      company: newVisitor.company,
    };
    setVisitors([...visitors, visitorObj]);
    setNewVisitor({ name: '', company: '' });
  };

  // Do check-in + save
  const handleCheckIn = () => {
    if (!selectedVisitor || !meetingFloor || !meetingRoom) return;
    const visitorObj = visitors.find((v) => v.id === parseInt(selectedVisitor));
    const checkInObj = {
      id: Date.now(),
      visitor: visitorObj.name,
      employee,
      company: visitorObj.company,
      date: checkInDate,
      floor: meetingFloor,
      room: meetingRoom, // ✅ save room
      purpose,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      status: 'Checked In',
    };

    const updatedCheckIns = [checkInObj, ...checkIns];
    setCheckIns(updatedCheckIns);
    localStorage.setItem('checkIns', JSON.stringify(updatedCheckIns));

    // Reset fields
    setSelectedVisitor('');
    setEmployee('');
    setMeetingFloor('');
    setMeetingRoom('');
    setPurpose('');
    setCheckInDate(new Date().toISOString().split('T')[0]);
    setCurrentPage(1);
  };

  const handleCheckOut = (id) => {
    const updated = checkIns.map((c) =>
      c.id === id ? { ...c, status: 'Checked Out' } : c
    );
    setCheckIns(updated);
    localStorage.setItem('checkIns', JSON.stringify(updated));
  };

  // ✅ Clear all check-ins
  const handleClearAll = () => {
    if (window.confirm('Clear all check-ins?')) {
      setCheckIns([]);
      localStorage.removeItem('checkIns');
      setCurrentPage(1);
    }
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = checkIns.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(checkIns.length / recordsPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">New Check-Ins</h1>

      {/* Create New Visitor */}
      <div className="bg-white shadow rounded p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Create New Visitor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Visitor's Name"
            className="border rounded px-3 py-2 w-full"
            value={newVisitor.name}
            onChange={(e) =>
              setNewVisitor({ ...newVisitor, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="From (Company)"
            className="border rounded px-3 py-2 w-full"
            value={newVisitor.company}
            onChange={(e) =>
              setNewVisitor({ ...newVisitor, company: e.target.value })
            }
          />
        </div>
        <button
          onClick={handleCreateVisitor}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Visitor
        </button>
      </div>

      {/* New Check-In */}
      <div className="bg-white shadow rounded p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">New Check-In</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <select
            className="border rounded px-3 py-2 w-full"
            value={selectedVisitor}
            onChange={(e) => setSelectedVisitor(e.target.value)}
          >
            <option value="">Select Visitor</option>
            {visitors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Whom to See"
            className="border rounded px-3 py-2 w-full"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          />
          {/* Floor Select */}
          <select
            className="border rounded px-3 py-2 w-full"
            value={meetingFloor}
            onChange={(e) => {
              setMeetingFloor(e.target.value);
              setMeetingRoom('');
            }}
          >
            <option value="">Select Floor</option>
            {Object.keys(floorRooms).map((floor) => (
              <option key={floor} value={floor}>{floor}</option>
            ))}
          </select>
          {/* Room Select */}
          <select
            className="border rounded px-3 py-2 w-full"
            value={meetingRoom}
            onChange={(e) => setMeetingRoom(e.target.value)}
            disabled={!meetingFloor}
          >
            <option value="">Select Room</option>
            {meetingFloor &&
              floorRooms[meetingFloor].map((room) => (
                <option key={room} value={room}>{room}</option>
              ))}
          </select>
          <input
            type="text"
            placeholder="Purpose of Visit"
            className="border rounded px-3 py-2 w-full"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
          <input
            type="date"
            className="border rounded px-3 py-2 w-full"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        <div className="mt-4 space-x-3">
          <button
            onClick={handleCheckIn}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Check In
          </button>
        </div>
      </div>

      {/* Recent Check-Ins */}
      <div className="bg-white shadow rounded p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Check-Ins</h2>
          <button
            onClick={handleClearAll}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="py-2 px-4">Visitor</th>
                <th className="py-2 px-4">Whom to See</th>
                <th className="py-2 px-4">From</th>
                <th className="py-2 px-4">Purpose</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Floor & Room</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((c) => (
                <tr key={c.id} className="border-b">
                  <td className="py-2 px-4">{c.visitor}</td>
                  <td className="py-2 px-4">{c.employee}</td>
                  <td className="py-2 px-4">{c.company}</td>
                  <td className="py-2 px-4">{c.purpose}</td>
                  <td className="py-2 px-4">{c.date}</td>
                  <td className="py-2 px-4">
                    {c.floor} {c.room && <span className="text-gray-500">({c.room})</span>}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(`1970-01-01T${c.time}`).toLocaleTimeString([], {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>
                  <td className="py-2 px-4">
                    {c.status === 'Checked In' ? (
                      <span className="px-2 py-1 text-green-700 bg-green-100 rounded">
                        {c.status}
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-red-700 bg-red-100 rounded">
                        {c.status}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {c.status === 'Checked In' && (
                      <button
                        onClick={() => handleCheckOut(c.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Check Out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {checkIns.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    No check-ins yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-500'
                  : 'bg-blue-500 text-white'
              }`}
            >
              Prev
            </button>
            <span className="px-3 py-1">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-500'
                  : 'bg-blue-500 text-white'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckIns;
