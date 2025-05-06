import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import { MdOutlineLocationOn } from "react-icons/md";
import axios from "axios";

export default function CustomizeOwnTour() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedArea, selectedLocations } = location.state || {};

  const [meals, setMeals] = useState([]);
  const [customMeal, setCustomMeal] = useState("");
  const [activities, setActivities] = useState([]);
  const [customActivity, setCustomActivity] = useState("");
  const [optionalDestinations, setOptionalDestinations] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const [customTransport, setCustomTransport] = useState("");
  const [hotel, setHotel] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const user = JSON.parse(localStorage.getItem("user")); // or useContext/AuthContext if using that
  const userId = user?._id; // or whatever your user identifier is

  // Update the handleBookPackage function
  const handleBookPackage = async () => {
    try {
      if (!userId) {
        alert("Please log in to book a package");
        return;
      }

      const data = {
        userId,
        area: selectedArea.area,
        locations: selectedLocations,
        meals: customMeal ? [customMeal] : [],
        activities: customActivity ? [customActivity] : [],
        optionalDestinations,
        transportMode: customTransport || transportMode,
        hotel,
        specialRequests,
      };

      const response = await axios.post(
        "http://10.50.227.117:5000/api/bookings",
        data
      );

      if (response.data.success) {
        alert("Booking successful!");
        navigate("/profile");
      } else {
        throw new Error(response.data.error || "Booking failed");
      }
    } catch (err) {
      console.error("❌ Booking failed:", err);
      alert(
        "Error booking package: " + (err.response?.data?.error || err.message)
      );
    }
  };

  if (!selectedArea || !selectedLocations) {
    return (
      <div style={{ padding: "2rem" }}>
        <Typography variant="h5" color="error">
          No data received. Please select an area and locations first.
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Customize Your Tour in <MdOutlineLocationOn /> {selectedArea.area}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Selected Locations:
      </Typography>

      <Grid container spacing={3}>
        {selectedLocations.map((loc, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={loc.image}
                alt={loc.name}
              />
              <CardContent>
                <Typography variant="subtitle1">{loc.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div style={{ marginTop: "2rem" }}>
        <TextField
          label="Meal Plans:"
          value={customMeal}
          onChange={(e) => setCustomMeal(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Activity Add-ons:"
          value={customActivity}
          onChange={(e) => setCustomActivity(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Optional Destinations"
          value={optionalDestinations}
          onChange={(e) => setOptionalDestinations(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Transportation Mode"
          value={transportMode}
          onChange={(e) => setTransportMode(e.target.value)}
          fullWidth
          margin="normal"
        ></TextField>

        <TextField
          label="Hotel Selection"
          value={hotel}
          onChange={(e) => setHotel(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Special Requests"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          multiline
          rows={3}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleBookPackage}
          style={{ marginTop: "1rem" }}
        >
          Book Package
        </Button>
      </div>
    </div>
  );
}