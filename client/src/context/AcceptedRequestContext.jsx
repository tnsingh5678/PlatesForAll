import React, { createContext, useState, useEffect } from 'react';

const AcceptedRequestContext = createContext();

const AcceptedRequestProvider = ({ children }) => {
  const [acceptedRequest, setAcceptedRequest] = useState(null);


  return (
    <AcceptedRequestContext.Provider value={{ acceptedRequest, setAcceptedRequest }}>
      {children}
    </AcceptedRequestContext.Provider>
  );
};

export { AcceptedRequestProvider, AcceptedRequestContext };
