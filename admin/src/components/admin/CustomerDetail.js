import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Swal from 'sweetalert2';

function CustomerDetail() {
  const [users, setUsers] = useState([]);
  const [userBookings, setUserBookings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://softwareproject-server.onrender.com/api/user_signup",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.data) {
        setUsers(res.data.data);
        // Fetch bookings for each user
        res.data.data.forEach((user) => fetchUserBookings(user._id));
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch user details",
      });
    }
  };

  const fetchUserBookings = async (userId) => {
    try {
      const res = await axios.get(
        `https://softwareproject-server.onrender.com/api/bookings/user/${userId}`
      );
      if (res.data) {
        setUserBookings((prev) => ({
          ...prev,
          [userId]: res.data,
        }));
      }
    } catch (err) {
      console.error(`Error fetching bookings for user ${userId}:`, err);
    }
  };

  return (
    <div className="customer-detail-container">
      <Button
        variant="outlined"
        onClick={() => navigate("/admin")}
        className="back-button"
        startIcon={<ArrowBackIcon />}
      >
        Back to Dashboard
      </Button>

      <div className="customer-header">
        <h2 className="customer-title">Customer Details</h2>
        <div className="customer-count">Total Customers: {users.length}</div>
      </div>

      <div className="table-responsive">
        <table className="customer-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <React.Fragment key={user._id}>
                  <tr className="user-row">
                    <td>{index + 1}</td>
                    <td className="user-name">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile || "Not provided"}</td>
                    <td>{user.address || "Not provided"}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          userBookings[user._id]?.length ? "active" : "inactive"
                        }`}
                      >
                        {userBookings[user._id]?.length
                          ? "Active"
                          : "No Bookings"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" className="booking-details-cell">
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          className="booking-summary"
                        >
                          <Typography>
                            Booking History (
                            {userBookings[user._id]?.length || 0} bookings)
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className="booking-details">
                          {userBookings[user._id]?.length > 0 ? (
                            <div className="booking-cards">
                              {userBookings[user._id].map((booking, idx) => (
                                <div key={idx} className="booking-card">
                                  <div className="booking-header">
                                    <h4>Booking #{idx + 1}</h4>
                                    <span className="booking-date">
                                      {new Date(
                                        booking.createdAt
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="booking-info">
                                    <div className="info-group">
                                      <label>Area:</label>
                                      <span>{booking.area}</span>
                                    </div>
                                    <div className="info-group">
                                      <label>Locations:</label>
                                      <span>
                                        {booking.locations
                                          .map((loc) => loc.name)
                                          .join(", ")}
                                      </span>
                                    </div>
                                    <div className="info-row">
                                      <div className="info-group">
                                        <label>Transport:</label>
                                        <span>{booking.transportMode}</span>
                                      </div>
                                      <div className="info-group">
                                        <label>Hotel:</label>
                                        <span>{booking.hotel}</span>
                                      </div>
                                    </div>
                                    <div className="info-group">
                                      <label>Activities:</label>
                                      <span>
                                        {booking.activities.join(", ")}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="no-bookings">
                              <Typography>
                                No bookings found for this user
                              </Typography>
                            </div>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CustomerDetail;
