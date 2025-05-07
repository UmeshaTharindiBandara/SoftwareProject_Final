import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./registration.css";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Avatar from "@mui/material/Avatar";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://softwareproject-server.onrender.com/api/user_signup",
        { name, email, password }
      );

      if (response.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Welcome to Our Community!",
          text: "Registration successful. Please login to continue.",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/login");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="auth-container">
      <Paper elevation={2} className="auth-paper">
        <Avatar className="auth-avatar">
          <PersonAddIcon sx={{ fontSize: 20 }} />
        </Avatar>

        <Typography component="h1" variant="h6" className="auth-title">
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} className="auth-form">
          <TextField
            margin="dense"
            required
            fullWidth
            label="Full Name"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            margin="dense"
            required
            fullWidth
            label="Email Address"
            type="email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="dense"
            required
            fullWidth
            label="Password"
            type="password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Sign Up"}
          </Button>

          <Box className="auth-links">
            <Typography variant="body2">
              Have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
