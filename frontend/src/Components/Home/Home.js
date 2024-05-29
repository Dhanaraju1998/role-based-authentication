import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to Home page</h2>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
