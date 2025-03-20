import React, { useState } from "react";

const ForgotPasswordPopup = ({ isVisible, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");

  if (!isVisible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email });
  };

  return (
    <div className="login-container">
      <li className="close-btn" onClick={onClose}>×</li>
      <div className="login-content">
        <form onSubmit={handleSubmit}>
          <h2 align="center">Forgot Password</h2>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-signin w-100">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
