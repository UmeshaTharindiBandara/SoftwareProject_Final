import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./AddHotel.css";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions 
} from "@mui/material";
import { FaHotel, FaMapMarkerAlt, FaDollarSign, FaStar, FaImage } from "react-icons/fa";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddHotel = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/areas");
        setAreas(response.data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    fetchAreas();
  }, []);

  useEffect(() => {
    if (selectedArea) {
      const area = areas.find(a => a._id === selectedArea);
      setLocations(area ? area.locations : []);
    } else {
      setLocations([]);
    }
  }, [selectedArea, areas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/addhotel", {
        name,
        image,
        price,
        rating,
        areaId: selectedArea,
        locationName: selectedLocation
      });
      Swal.fire("Success!", "Hotel added successfully!", "success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred. Please try again.",
      });
    }
  };

  const handleBackToDashboard = () => {
    navigate("/admin");
  };

  return (
    <Box className="add-hotel-container">
      {/* Header Section */}
      <Box className="hotel-header-section">
        <FaHotel className="hotel-header-icon" />
        <Typography variant="h3" className="hotel-header-title">
          Add a New Hotel
        </Typography>
        <Typography variant="body1" className="hotel-header-subtitle">
          Fill in the details to register a new hotel
        </Typography>
      </Box>

      {/* Form Section */}
      <Box className="hotel-form-section">
        <form id="hotel-form" onSubmit={handleSubmit}>
          {/* Hotel Name Input */}
          <Card className="hotel-input-card">
            <CardContent>
              <Typography variant="h6">Hotel Information</Typography>
              <TextField
                fullWidth
                variant="outlined"
                label="Hotel Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                InputProps={{ startAdornment: <FaHotel className="hotel-input-icon" /> }}
              />
            </CardContent>
          </Card>

          {/* Image Input */}
          <Card className="hotel-input-card">
            <CardContent>
              <TextField
                fullWidth
                variant="outlined"
                label="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                InputProps={{ startAdornment: <FaImage className="hotel-input-icon" /> }}
              />
            </CardContent>
          </Card>

          {/* Area & Location Selection */}
          <Typography variant="h6" className="hotel-locations-title">
            Select Area & Location
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                variant="outlined"
                label="Select Area"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                required
                SelectProps={{ native: true }}
              >
                <option value="">Select Area</option>
                {areas.map(area => (
                  <option key={area._id} value={area._id}>{area.area}</option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                variant="outlined"
                label="Select Location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                required
                disabled={!selectedArea}
                SelectProps={{ native: true }}
              >
                <option value="">Select Location</option>
                {locations.map((loc, idx) => (
                  <option key={idx} value={loc.name}>{loc.name}</option>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <br/>

          {/* Price Input */}
          <Card className="hotel-input-card">
            <CardContent>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                InputProps={{ startAdornment: <FaDollarSign className="hotel-input-icon" /> }}
              />
            </CardContent>
          </Card>

          {/* Rating Input */}
          <Card className="hotel-input-card">
            <CardContent>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                label="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
                InputProps={{ startAdornment: <FaStar className="hotel-input-icon" /> }}
              />
            </CardContent>
          </Card>

          {/* Form Actions */}
          <Box className="hotel-form-actions">
            
           
            <Button
              variant="contained"
              type="submit"
              className="submit-button">
                  Add Hotel
            </Button>

            <Button
              variant="outlined"
              onClick={handleBackToDashboard}
              className="back-button"
              startIcon={<ArrowBackIcon />}
            >
              Back to Dashboard
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddHotel;
