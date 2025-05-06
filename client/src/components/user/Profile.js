import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import { Typography, Card, CardContent, Grid } from "@mui/material";

const ProfilePage = () => {
  // Get user from localStorage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const userId = user?._id;

  // Form state
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    mobile: user.mobile || "",
    address: user.address || "",
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [bookedTours, setBookedTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const location = useLocation();

  // Initialize form data when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobile || "",
        address: user.address || "",
      });
    }
  }, [user]);

  // Handle booked tours from location state
  useEffect(() => {
    if (location.state?.bookedTour) {
      setBookedTours((prev) => [...prev, location.state.bookedTour]);
    }
  }, [location.state]);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(
          `https://softwareproject-server.onrender.com/api/bookings/${userId}`
        );
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetchBookings();
  }, [userId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    if (e.target.files?.[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please log in to update your profile");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("userId", userId);

    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Append profile picture if exists
    if (profilePicture) {
      formDataToSend.append("profilePicture", profilePicture);
    }

    try {
      const response = await axios.put(
        "https://softwareproject-server.onrender.com/api/profile",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const updatedUser = { ...user, ...response.data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      alert(err.response?.data?.error || "Failed to update profile");
    }
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <h2>Profile</h2>
        <div className="profile-card">
          <input
            type="file"
            id="profilePicture"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleProfilePictureChange}
          />

          <img
            src={user.profilePicture || "/assets/images/profile1.png"}
            alt="Profile"
            style={{ width: "50px", height: "50px", cursor: "pointer" }}
            onClick={() => document.getElementById("profilePicture").click()}
          />

          <h3>
            {formData.firstName} {formData.lastName}
          </h3>
          <p>{formData.email}</p>
        </div>

        <div className="profile-form">
          <h3>Update Profile</h3>
          <form onSubmit={handleProfileUpdate}>
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Mobile No.</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" onSubmit={handleProfileUpdate}>
              Update Profile
            </button>
          </form>
        </div>
      </div>

      <div className="profile-content">
        <div className="bookings-section">
          <Grid container spacing={3}>
            {bookings.map((booking, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <Typography variant="h4" gutterBottom>
                    Your Own Cuztormize Booking
                  </Typography>
                  <CardContent>
                    <Typography variant="h6">Area: {booking.area}</Typography>
                    <Typography variant="body2">
                      <strong>Locations:</strong>{" "}
                      {booking.locations.map((loc) => loc.name).join(", ")}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Meals:</strong> {booking.meals.join(", ")}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Activities:</strong>{" "}
                      {booking.activities.join(", ")}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Optional:</strong> {booking.optionalDestinations}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Transport:</strong> {booking.transportMode}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Hotel:</strong> {booking.hotel}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Special Requests:</strong>{" "}
                      {booking.specialRequests}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
