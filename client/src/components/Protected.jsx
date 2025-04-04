import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element: Component, ...rest }) {
  const [auth, setAuth] = useState(null);  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);  
    } else {
      setAuth(false);  
    }
  }, []);

  if (auth === null) {
    return <div>Loading...</div>;  
  }
  return auth ? <Component {...rest} /> : <Navigate to="/Login" replace />;
}
