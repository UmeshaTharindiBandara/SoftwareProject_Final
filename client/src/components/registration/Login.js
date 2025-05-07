import React, { useState } from "react";
import "./registration.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../AuthContext";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://softwareproject-server.onrender.com/api/user_login",
        { email, password }
      );

      if (response.data.status === "success") {
        login(response.data.user, response.data.token);

        Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          text: `Hello, ${response.data.user.name}!`,
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(response.data.user.role === "admin" ? "/admin" : "/tour");
      }
    } catch (err) {
      console.error("Login error:", err);
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
          Welcome Back
        </Typography>

        <Box component="form" onSubmit={handleSubmit} className="auth-form">
          <TextField
            margin="dense"
            required
            fullWidth
            label="Email Address"
            type="email"
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
            {loading ? <CircularProgress size={20} /> : "Sign In"}
          </Button>

          <Box className="auth-links">
            <Typography variant="body2">
              New user?{" "}
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
