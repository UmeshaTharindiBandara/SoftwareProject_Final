import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CustomerDetail() {
  const [users, setUsers] = useState([]);
  const [userBookings, setUserBookings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://softwareproject-server.onrender.com/api/user_signup");
      if (res.data && Array.isArray(res.data.data)) {
        const updatedUsers = res.data.data.map((user) => ({
          ...user,
          _id: user._id || user.id,
        }));
        setUsers(updatedUsers);
        
        // Fetch bookings for each user
        updatedUsers.forEach(user => fetchUserBookings(user._id));
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchUserBookings = async (userId) => {
    try {
      const res = await axios.get(`https://softwareproject-server.onrender.com/api/bookings/${userId}`);
      setUserBookings(prev => ({
        ...prev,
        [userId]: res.data
      }));
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

      <h2 className="customer-title">Customer Details</h2>

      <table className="customer-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Profile Picture</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <React.Fragment key={user._id}>
              <tr className="user-row">
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile || 'Not provided'}</td>
                <td>{user.address || 'Not provided'}</td>
                <td>{user.profilePicture ? 'Uploaded' : 'No image'}</td>
              </tr>
              <tr>
                <td colSpan="6" className="booking-details-cell">
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Booking Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {userBookings[user._id]?.length > 0 ? (
                        <table className="booking-table">
                          <thead>
                            <tr>
                              <th>Area</th>
                              <th>Locations</th>
                              <th>Meals</th>
                              <th>Activities</th>
                              <th>Transport</th>
                              <th>Hotel</th>
                              <th>Special Requests</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userBookings[user._id].map((booking, idx) => (
                              <tr key={idx}>
                                <td>{booking.area}</td>
                                <td>{booking.locations.map(loc => loc.name).join(', ')}</td>
                                <td>{booking.meals.join(', ')}</td>
                                <td>{booking.activities.join(', ')}</td>
                                <td>{booking.transportMode}</td>
                                <td>{booking.hotel}</td>
                                <td>{booking.specialRequests || 'None'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <Typography>No bookings found for this user</Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerDetail;