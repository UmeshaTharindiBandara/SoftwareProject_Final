import React, { useEffect, useState } from "react";
import { Button, Box, Grid, Paper, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";
import TourIcon from "@mui/icons-material/TravelExplore";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import HotelIcon from "@mui/icons-material/Hotel";
import { FaGlobe, FaMapMarkedAlt, FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tours")
      .then((res) => {
        setTours(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Welcome, Admin</h1>
        <p>Manage and Explore Tours and Locations with Ease</p>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Quick Access Section */}
        <Grid container spacing={4} className="quick-access-section">
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              className="quick-access-card"
              onClick={() => handleNavigation("/addedpackage")}
            >
              <TourIcon className="card-icon" />
              <Typography variant="h6">View Tour Packages</Typography>
              <p>Check and manage all available tours.</p>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              className="quick-access-card"
              onClick={() => handleNavigation("/addedlocation")}
            >
              <LocationOnIcon className="card-icon" />
              <Typography variant="h6">View Locations</Typography>
              <p>Explore and manage areas and locations.</p>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              className="quick-access-card"
              onClick={() => handleNavigation("/addedhotel")}
            >
              <HotelIcon className="card-icon" /> {/* Updated icon */}
              <Typography variant="h6">View Hotels</Typography>
              <p>Check and update hotels.</p>
            </Paper>
          </Grid>
        </Grid>

        {/* Add New Section */}
        <div className="add-buttons-section">
        <Link to="/add" className="add-link">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="add-button"
          >
            
            + Add Tour
          </motion.div>
        </Link>
        <Link to="/addnew" className="add-link">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="add-button"
          >
            
            + Add Locations
          </motion.div>
        </Link>
        <Link to="/addhotel" className="add-link">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="add-button"
          >
            
            + Add Hotels
          </motion.div>
        </Link>
      </div>

        {/* Insights Section */}
        <div className="insights-section">
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} className="insight-card">
                <FlightTakeoffIcon className="insight-icon" />
                <Typography variant="h6">Total Tours</Typography>
                <p>{tours.length || "Loading..."}</p>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} className="insight-card">
                <NaturePeopleIcon className="insight-icon" />
                <Typography variant="h6">Active Locations</Typography>
                <p>15 Locations</p>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} className="insight-card">
                <LocationOnIcon className="insight-icon" />
                <Typography variant="h6">New Additions</Typography>
                <p>4 This Week</p>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
