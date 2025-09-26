import React, { useState, useEffect } from 'react';

const Schedules = () => {
  
  const [schedules, setSchedules] = useState([]);


  const [formData, setFormData] = useState({
    visitorName: '',
    personToSee: '',
    date: '',
    time: '',
    purpose: '', 
  });


  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString('en-CA') 
  );


  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('schedules') || '[]');
    setSchedules(stored);
  }, []);

 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const { visitorName, personToSee, date, time, purpose } = formData;
    if (!visitorName || !personToSee || !date || !time || !purpose) {
      alert('Please fill in all fields');
      return;
    }

    
    const duplicate = schedules.find(
      (s) => s.date === date && s.time === time
    );
    if (duplicate) {
      alert('This time slot already exists for the selected date.');
      return;
    }

    const newSchedule = {
      id: Date.now(),
      ...formData,
    };

   
    const updatedSchedules = [...schedules, newSchedule];
    setSchedules(updatedSchedules);
    localStorage.setItem('schedules', JSON.stringify(updatedSchedules));

    
    setSelectedDate(date);
    setCurrentPage(1); 

  
    setFormData({
      visitorName: '',
      personToSee: '',
      date: '',
      time: '',
      purpose: '', 
    });
  };

  
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all schedules?")) {
      setSchedules([]); 
      localStorage.removeItem('schedules'); 
      setCurrentPage(1); 
    }
  };


  const filteredSchedules = schedules.filter(
    (sch) => sch.date === selectedDate
  );


  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredSchedules.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredSchedules.length / recordsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black mb-6">Create Schedule</h1>

   
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Visitor Name</label>
          <input
            type="text"
            name="visitorName"
            value={formData.visitorName}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter visitor name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Person to See</label>
          <input
            type="text"
            name="personToSee"
            value={formData.personToSee}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter person to see"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date of Meeting</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Time of Meeting</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Purpose of Visit</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter purpose"
          />
        </div>

        <div className="md:col-span-2 lg:col-span-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Create Schedule
          </button>
        </div>
      </form>

  
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">View schedules for date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setCurrentPage(1); 
          }}
          className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>


      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">
          Schedules for {selectedDate}
        </h2>
        <button
          onClick={handleClearAll}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Clear All
        </button>
      </div>

   
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Visitor Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Person to See</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Time</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Purpose</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRecords.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No schedules for this date
                </td>
              </tr>
            ) : (
              currentRecords.map((sch) => (
                <tr key={sch.id}>
                  <td className="px-4 py-3">{sch.visitorName}</td>
                  <td className="px-4 py-3">{sch.personToSee}</td>
                  <td className="px-4 py-3">{sch.date}</td>
                  <td className="px-4 py-3">
                    {new Date(`1970-01-01T${sch.time}`).toLocaleTimeString([], {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>
                  <td className="px-4 py-3">{sch.purpose}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

   
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'}`}
          >
            Prev
          </button>
          <span className="px-3 py-1">{currentPage} / {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Schedules;
