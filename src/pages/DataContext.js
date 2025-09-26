// src/context/DataContext.jsx
import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [checkIns, setCheckIns] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const addCheckIn = (record) => setCheckIns((prev) => [...prev, record]);
  const addSchedule = (record) => setSchedules((prev) => [...prev, record]);

  return (
    <DataContext.Provider
      value={{ checkIns, addCheckIn, schedules, addSchedule }}
    >
      {children}
    </DataContext.Provider>
  );
};
