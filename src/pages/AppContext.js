import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // centralised states
  const [checkIns, setCheckIns] = useState([]);
  const [schedules, setSchedules] = useState([]);

  return (
    <AppContext.Provider value={{ checkIns, setCheckIns, schedules, setSchedules }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hook
export const useAppContext = () => useContext(AppContext);
