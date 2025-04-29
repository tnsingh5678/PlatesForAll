import { createContext, useState, useEffect } from 'react';

export const VolunteerContext = createContext();

export const VolunteerProvider = ({ children }) => {
  const [volunteers, setVolunteers] = useState(() => {
    const saved = localStorage.getItem('volunteers');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('volunteers', JSON.stringify(volunteers));
  }, [volunteers]);

  return (
    <VolunteerContext.Provider value={{ volunteers, setVolunteers }}>
      {children}
    </VolunteerContext.Provider>
  );
};
