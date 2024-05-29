import React, { useState } from "react";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  const [firstnameError, setFirstnameError] = useState("");

  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [dobError, setDobError] = useState("");
  const [fileError, setFileError] = useState("");

  const navigate = useNavigate();

  const CreateAccountHandler = (e) => {
    e.preventDefault();

    if (validateInputFields()) {
      let userDetails = {
        firstname,
        lastname,
        email,
        password,
        dob,
        avatar,
      };

      // Add middlename to userDetails only if it's not empty
      if (middlename.trim() !== "") {
        userDetails = { ...userDetails, middlename };
      }

      axios
        .post("http://localhost:4300/auth/register", userDetails)
        .then((res) => {
          console.log(res)
          alert(res.data.message);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const validateInputFields = () => {
    setFirstnameError("");
    setLastnameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setDobError("");
    setFileError("");

    let isValid = true;

    if (firstname.trim() === "") {
      setFirstnameError("Please enter your firstname");
      isValid = false;
    }

    if (lastname.trim() === "") {
      setLastnameError("Please enter your lastname");
      isValid = false;
    }

    if (email.trim() === "") {
      setEmailError("Please enter your email");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Please enter your password");
      isValid = false;
    }

    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (dob.trim() === "") {
      setDobError("Please enter your date of birth");
      isValid = false;
    }

    if (avatar === "") {
      setFileError("Please select an image file");
      isValid = false;
    }

    return isValid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.type;

      if (!fileType.startsWith("image/")) {
        setFileError("Please select a valid image file (JPEG or PNG)");
        return;
      }

      try {
        await postDetails(file);
      } catch (error) {
        console.error("Error handling file:", error);
        setFileError("Error handling the selected image");
      }
    }
  };

  const postDetails = async (pics) => {
    setLoading(true);

    if (!pics || (pics.type !== "image/jpeg" && pics.type !== "image/png")) {
      setFileError("Please select a valid image (JPEG or PNG)");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "MERN_CHAT_APP");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dhanaraju/image/upload",
        data
      );

      setAvatar(response.data.secure_url);
      setLoading(false);
      setFileError("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setFileError("Error uploading image to Cloudinary");
    }
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="main_container">
        <div className="register_container">
          <form autoComplete="off">
            <h2 className="login_text">Create Account</h2>
            <div style={{ width: "100%", display: "flex" }}>
              <TextField
                label="Firstname"
                required
                variant="outlined"
                color="secondary"
                type="text"
                sx={{ mb: 2, mr: 1 }}
                fullWidth
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                error={!!firstnameError}
                helperText={firstnameError}
              />
              <TextField
                label="Middle Name"
                variant="outlined"
                color="secondary"
                type="text"
                sx={{ mb: 2, mr: 1 }}
                fullWidth
                value={middlename}
                onChange={(e) => setMiddlename(e.target.value)}
              />
              <TextField
                label="Lastname"
                required
                variant="outlined"
                color="secondary"
                type="text"
                fullWidth
                sx={{ mb: 2 }}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                error={!!lastnameError}
                helperText={lastnameError}
              />
            </div>

            <TextField
              label="Email"
              required
              variant="outlined"
              color="secondary"
              type="email"
              sx={{ mb: 2 }}
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />

            <TextField
              label="Password"
              required
              variant="outlined"
              color="secondary"
              type={showPassword ? "text" : "password"}
              fullWidth
              sx={{ mb: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={togglePasswordVisibility}
                      color="inherit"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!passwordError}
              helperText={passwordError}
            />

            <TextField
              label="Confirm Password"
              required
              variant="outlined"
              color="secondary"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              sx={{ mb: 2 }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={toggleConfirmPasswordVisibility}
                      color="inherit"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />

            <TextField
              label="Date of Birth"
              required
              variant="outlined"
              color="secondary"
              type="date"
              fullWidth
              sx={{ mb: 2, mr: 1 }}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={!!dobError}
              helperText={dobError}
            />
            <TextField
              label="Profile Pic"
              required
              variant="outlined"
              color="secondary"
              type="file"
              fullWidth
              sx={{ mb: 2 }}
              onChange={handleFileChange}
              InputLabelProps={{ shrink: true }}
              error={!!fileError}
              helperText={fileError}
            />
            <div
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <Button
                variant="contained"
                className="submit_btn"
                type="submit"
                sx={{ mb: 2 }}
                color="primary"
                onClick={CreateAccountHandler}
              >
                Create
              </Button>
              <Button
                variant="contained"
                className="submit_btn"
                color="warning"
                onClick={login}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
