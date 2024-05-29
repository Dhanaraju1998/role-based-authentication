import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const newData = {
        email,
        password,
      };
      axios
        .post("http://localhost:4300/auth/login", newData)
        .then((res) => {
          localStorage.setItem("jwt_token", res.data.userDetails?.token);
          localStorage.setItem("role", res.data.userDetails?.role);
          if (res.data.userDetails?.role === "user") {
            navigate("/");
          }
          if (res.data.userDetails?.role === "admin") {
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const createAccount = () => {
    navigate("/create");
  };
  return (
    <>
      <div className="main_container">
        <div className="login_container">
          <form autoComplete="off">
            <h2 className="login_text">Login to Your Account</h2>
            <TextField
              label="Email"
              required
              variant="outlined"
              color="secondary"
              type="email"
              sx={{ mb: 3 }}
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              required
              variant="outlined"
              color="secondary"
              type="password"
              fullWidth
              sx={{ mb: 3 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              className="submit_btn"
              type="submit"
              sx={{ mb: 2 }}
              onClick={loginHandler}
            >
              Login
            </Button>
            <Button
              variant="contained"
              className="submit_btn"
              color="warning"
              onClick={createAccount}
            >
              Create Account
            </Button>
          </form>
        </div>
        <div style={{ textAlign: "center" }}>
          <h5 className="email"> User Email: ram@gmail.com</h5>
          <h5 className="password">User Password: ram</h5>
        </div>
        <div style={{ textAlign: "center" }}>
          <h5 className="email"> Admin Email: naramsettydhanaraj@gmail.com</h5>
          <h5 className="password">Admin Password: dhanaraj</h5>
        </div>
      </div>
    </>
  );
};

export default Login;
