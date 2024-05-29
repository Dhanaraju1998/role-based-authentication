import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("jwt_token");
  const userRole = localStorage.getItem("role");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else if (userRole !== "admin") {
    return <Home />;
  } else if (userRole !== "user") {
    return <Dashboard />;
  }
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
