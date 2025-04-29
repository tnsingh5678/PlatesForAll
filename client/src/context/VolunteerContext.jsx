import { createContext, useEffect, useState } from 'react';

const VolunteerContext = createContext();

const VolunteerProvider = ({ children }) => {
  const [volunteers, setVolunteers] = useState([]);
  useEffect(()=>{
    console.log(volunteers)
  },[volunteers])

  return (
    <>
    <VolunteerContext.Provider value={{ volunteers, setVolunteers }}>
      {children}
    </VolunteerContext.Provider>
    </>
  );
};

export { VolunteerContext, VolunteerProvider };
