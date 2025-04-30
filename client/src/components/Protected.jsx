import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element: Component, ...rest }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuth(!!token);  // Set auth to true if token exists, false otherwise
  }, []);

  if (auth === null) {
    return <div>Loading...</div>; // Optionally, show a loading spinner or a placeholder component
  }

  // If authenticated, render the component, otherwise redirect to login page
  return auth ? <Component {...rest} /> : <Navigate to="/Login" replace />;
}
