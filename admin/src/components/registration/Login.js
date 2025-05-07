import React, { useState } from "react";
import "./registration.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://softwareproject-server.onrender.com/api/admin_login",
        { email, password }
      );

      if (response.data.status === "success") {
        navigate("/admin");
        Swal.fire({
          icon: "success",
          title: "Welcome Admin!",
          text: "Successfully logged in",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Please check your credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="auth-container">
      <Paper elevation={2} className="auth-paper">
        <Avatar className="auth-avatar">
          <LockOutlinedIcon sx={{ fontSize: 20 }} />
        </Avatar>

        <Typography component="h1" variant="h6" className="auth-title">
          Admin Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} className="auth-form">
          <TextField
            margin="dense"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
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
            autoComplete="current-password"
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
            {loading ? "..." : "Sign In"}
          </Button>

          <Box className="auth-links">
            <Typography variant="body2">
              <Link to="/forgot-password" className="auth-link">
                Forgot password?
              </Link>
            </Typography>
          </Box>

          <Box className="auth-links">
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
