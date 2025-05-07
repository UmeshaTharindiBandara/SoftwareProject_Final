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
      await axios.post(
        "https://softwareproject-server.onrender.com/api/admin_signup",
        { name, email, password }
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can now login with your credentials",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          err.response?.data?.message ||
          "An error occurred during registration",
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
          Admin Registration
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
            {loading ? "..." : "Sign Up"}
          </Button>

          <Box className="auth-links">
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/" className="auth-link">
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
