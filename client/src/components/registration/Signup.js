import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./registration.css";
import axios from "axios";
import Swal from "sweetalert2";

function Signup() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/signup", { name, email, password })
      .then((res) => {
        Swal.fire(
          "Congratulations! You Have Successfully Registered with Us 😊",
          "",
          "success"
        );
        navigate("/login");
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred. Please try again. 😔",
        })
      );
  };

  return (
    <>
      <div className="wrapper">
        <div id="box">
          <img
            src="https://image.freepik.com/free-icon/refresh_318-33117.jpg"
            alt="lock"
          />
          <h3>Please sign in</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="USERNAME"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              required=""
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

            <input
              type="submit"
              className="signup"
              value="go on... click me!"
            />
          </form>

          <div className="signup">
            <p>
              A member ?<Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
