import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import { Typography, Card, CardContent, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Divider } from "@mui/material";
import Swal from "sweetalert2";
// Add to your existing imports
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const ProfilePage = () => {
  // Get user from localStorage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const userId = user?._id;
  // Add this state near your other state declarations
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  // Add this function in your Profile component
  const handleDeleteBooking = async (bookingId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `https://softwareproject-server.onrender.com/api/bookings/${bookingId}`
        );

        // Update local state to remove the deleted booking
        setBookings(bookings.filter((booking) => booking._id !== bookingId));

        Swal.fire("Deleted!", "Your booking has been cancelled.", "success");
      }
    } catch (error) {
      console.error("Delete booking error:", error);
      Swal.fire("Error!", "Failed to delete booking.", "error");
    }
  };

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

  // Add this state for cart items
  const [cartItems, setCartItems] = useState([]);

  // Add this useEffect to fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          `https://softwareproject-server.onrender.com/api/cart/${userId}`
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId]);
  // Add this function to handle cart item deletion
  const handleDeleteCartItem = async (cartItemId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `https://softwareproject-server.onrender.com/api/cart/${cartItemId}`
        );
        setCartItems(cartItems.filter((item) => item._id !== cartItemId));
        Swal.fire("Deleted!", "Your cart item has been removed.", "success");
      }
    } catch (error) {
      console.error("Failed to delete cart item:", error);
      Swal.fire("Error!", "Failed to remove item from cart.", "error");
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  // Add this function to handle overlay clicks
  const handleOverlayClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="profile-container">
      <IconButton
        className="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        sx={{
          position: "fixed",
          left: isSidebarOpen ? "280px" : "20px",
          top: "20px",
          zIndex: 1001,
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "left 0.3s ease",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      {/* Add overlay for mobile */}
      {isSidebarOpen && window.innerWidth <= 768 && (
        <div className="sidebar-overlay" onClick={handleOverlayClick} />
      )}
      
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
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

      <div className={`profile-content ${isSidebarOpen ? "shifted" : ""}`}>
        <div className="bookings-section">
          <Typography variant="h4" gutterBottom>
            Own Customized Bookings
          </Typography>
          <Grid container spacing={3}>
            {bookings.map((booking) => (
              <Grid item xs={12} sm={6} md={4} key={booking._id}>
                <Card
                  sx={{
                    position: "relative",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <IconButton
                    onClick={() => handleDeleteBooking(booking._id)}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: "error.main",
                      "&:hover": {
                        backgroundColor: "rgba(211, 47, 47, 0.04)",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Area: {booking.area}
                    </Typography>
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
            {bookings.length === 0 && (
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  textAlign="center"
                  color="text.secondary"
                >
                  No bookings found
                </Typography>
              </Grid>
            )}
          </Grid>
        </div>
        {/* Cart Items Section */}
        <div className="cart-section">
          <Typography variant="h4" gutterBottom>
            Cart Booking Items
          </Typography>
          <Grid container spacing={3}>
            {cartItems.map((cartItem) => (
              <Grid item xs={12} sm={6} md={4} key={cartItem._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {cartItem.packageDetails.tour.area}
                    </Typography>
                    <Divider sx={{ my: 1 }} />

                    <Typography variant="body2">
                      <strong>Selected Options:</strong>
                    </Typography>
                    <Typography variant="body2">
                      Meals: {cartItem.packageDetails.selectedOptions.mealPlan}
                    </Typography>
                    <Typography variant="body2">
                      Activities:{" "}
                      {cartItem.packageDetails.selectedOptions.activities.join(
                        ", "
                      )}
                    </Typography>
                    <Typography variant="body2">
                      Transport:{" "}
                      {cartItem.packageDetails.selectedOptions.transport}
                    </Typography>
                    <Typography variant="body2">
                      Hotel: {cartItem.packageDetails.selectedOptions.hotels}
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Total Budget: ${cartItem.packageDetails.totalBudget}
                    </Typography>

                    <IconButton
                      onClick={() => handleDeleteCartItem(cartItem._id)}
                      color="error"
                      sx={{ mt: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {cartItems.length === 0 && (
              <Grid item xs={12}>
                <Typography variant="body1" textAlign="center">
                  No items in your cart
                </Typography>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
