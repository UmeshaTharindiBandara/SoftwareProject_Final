import React, { useState } from "react";
import "./registration.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", { email, password })
      .then((res) => {
        if (res.data.status === "success") {
          if (res.data.role === "admin") {
            navigate("/admin");
            Swal.fire(
              " You Have Successfully loggedin as Admin 😊",
              "",
              "success"
            );
          } else {
            navigate("/tour");
            Swal.fire(
              "You Have Successfully loggedin as Customer 😊",
              "",
              "success"
            );
          }
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
      });
  };

  return (
    <>
      <div className="wrapper">
        <div id="box">
          <img
            src="https://image.freepik.com/free-icon/refresh_318-33117.jpg"
            alt="lock"
          />
          <h3>Please Login in Here</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              required
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              name="pswd"
              placeholder="PASSWORD"
              required=""
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <button className="signup">go on... click me!"</button>
          </form>
          <a href="#">forgot ?</a>

          <div className="signup">
            <p>
              not a member ? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
