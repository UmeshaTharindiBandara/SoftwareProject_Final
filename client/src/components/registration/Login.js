import React, { useState } from "react";
import "./registration.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    axios
      .post("http://localhost:5000/api/user_login", { email, password })
      .then((res) => {
        if (res.data.status === "success") {
          navigate("/tour");
          Swal.fire(
            "You Have Successfully loggedin as Customer 😊",
            "",
            "success"
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "invalid Login Credintials",
          });
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login failed. Please check your Email or password and try again.",
        });
=======
    try {
      const response = await axios.post("http://localhost:5000/api/user_login", {
        email,
        password
>>>>>>> main
      });

      if (response.data.status === "success") {
        // Use the login function from AuthContext
        login(response.data.user, response.data.token);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: `Welcome back, ${response.data.user.name}!`,
        });

        // Navigate based on role
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/tour");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "An error occurred during login",
      });
    }
  };

  return (
    <div className="wrapper">
      <div id="box">
        <h3>Please Login Here</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="signup">
            Login
          </button>
        </form>
        <div className="signup">
          <p>
            Not a member? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;