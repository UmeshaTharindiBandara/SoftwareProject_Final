import React, { useState } from "react";
import axios from "axios";
import './Profile.css';  
const profileIcon = "/assets/images/profile1.png";

const ProfilePage = () => {
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");
  const [updatedMobile, setUpdatedMobile] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", updatedFirstName);
    formData.append("lastName", updatedLastName);
    formData.append("email", updatedEmail);
    formData.append("mobile", updatedMobile);
    formData.append("address", updatedAddress);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      {/* Sidebar with Profile Card */}
      <div className="sidebar">
        <h2>Profile</h2>
        <div className="profile-card">
          <input
            type="file"
            id="profilePicture"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />

          <img
            src={profileIcon}
            alt="Profile Icon"
            style={{ width: "50px", height: "50px", cursor: "pointer" }}
            onClick={() => document.getElementById("profilePicture").click()}
            />

          <h3>{updatedFirstName} {updatedLastName}</h3>
          <p>{updatedEmail}</p>
        </div>

        {/* Form for Profile Update */}
      <div className="profile-form">
        <h3>Update Profile</h3>
        <form onSubmit={handleProfileUpdate}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={updatedFirstName}
              onChange={(e) => setUpdatedFirstName(e.target.value)}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={updatedLastName}
              onChange={(e) => setUpdatedLastName(e.target.value)}
            />
          </div>
          <div>
            <label>Mobile No.</label>
            <input
              type="text"
              value={updatedMobile}
              onChange={(e) => setUpdatedMobile(e.target.value)}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              value={updatedAddress}
              onChange={(e) => setUpdatedAddress(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>


      </div>


      {/* Form for Profile Update */}
      <div className="profile-form">
        <h3>Cart tours</h3>
        
      </div>


      
    </div>
  );
};

export default ProfilePage;
