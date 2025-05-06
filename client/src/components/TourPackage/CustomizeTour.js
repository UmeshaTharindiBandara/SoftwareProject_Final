import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faHiking } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./CustomizeTour.css";
import PackageDetails from "./PackageDetails.js";

const CustomizeTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    destinations: [],
    hotels: "",
    guides: "",
    transport: "",
    mealPlan: "",
    activities: [],
    specialRequests: "",
  });

  useEffect(() => {
    axios
      .get(`https://softwareproject-server.onrender.com/api/tours/${id}`)
      .then((res) => {
        setTour(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching tour details:", err);
      });
  }, [id]);

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setSelectedOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMealSelect = (meal) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      mealPlan: meal,
    }));
  };

  const handleActivitySelect = (activity) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      activities: prevState.activities.includes(activity)
        ? prevState.activities.filter((item) => item !== activity)
        : [...prevState.activities, activity],
    }));
  };

  const handleConfirm = () => {
    navigate("/view-customized-package", {
      state: { tour, selectedOptions },
    });
  };

  if (!tour) return <Typography variant="h6">Loading...</Typography>;

  return (
    <div className="customize-tour-container">
      <Typography variant="h4" className="title" gutterBottom>
        Customize Your Tour Package: {tour.name}
      </Typography>

      <PackageDetails />

      {/* Meal Plans */}
      <Card variant="outlined" className="customization-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Meal Plans <FontAwesomeIcon icon={faUtensils} />
          </Typography>
          <Divider />
          {tour.categories.meals.map((meal, index) => (
            <Button
              key={meal}
              variant={
                selectedOptions.mealPlan === meal ? "contained" : "outlined"
              }
              onClick={() => handleMealSelect(meal)}
            >
              {meal} - ${tour.budgets.mealBudgets[index]}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Activity Add-Ons */}
      <Card variant="outlined" className="customization-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Activity Add-Ons <FontAwesomeIcon icon={faHiking} />
          </Typography>
          <Divider />
          <FormGroup>
            {tour.categories.activities.map((activity, index) => (
              <FormControlLabel
                key={activity}
                control={
                  <Checkbox
                    checked={selectedOptions.activities.includes(activity)}
                    onChange={() => handleActivitySelect(activity)}
                  />
                }
                label={`${activity} - $${tour.budgets.activityBudgets[index]}`}
              />
            ))}
          </FormGroup>
        </CardContent>
      </Card>

      {/* Optional Destinations */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Optional Destinations</InputLabel>
        <Select
          name="destinations"
          multiple
          value={selectedOptions.destinations}
          onChange={handleOptionChange}
        >
          {tour.categories.optionalDestinations.map((destination, index) => (
            <MenuItem key={destination} value={destination}>
              {destination} - ${tour.budgets.optionalDestinationBudgets[index]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Transportation Mode */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Transportation Mode</InputLabel>
        <Select
          name="transport"
          value={selectedOptions.transport}
          onChange={handleOptionChange}
        >
          {tour.categories.transportModes.map((mode, index) => (
            <MenuItem key={mode} value={mode}>
              {mode} - ${tour.budgets.transportModeBudgets[index]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Hotel Selection */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Hotel Selection</InputLabel>
        <Select
          name="hotels"
          value={selectedOptions.hotels}
          onChange={handleOptionChange}
        >
          {tour.categories.hotels.map((hotel, index) => (
            <MenuItem key={hotel} value={hotel}>
              {hotel} - ${tour.budgets.hotelBudgets[index]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Special Requests */}
      <TextField
        name="specialRequests"
        label="Special Requests"
        value={selectedOptions.specialRequests}
        onChange={handleOptionChange}
        fullWidth
        margin="normal"
      />

      {/* Confirm Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleConfirm}
        style={{ marginTop: "20px" }}
      >
        Book Package
      </Button>
    </div>
  );
};

export default CustomizeTour;
