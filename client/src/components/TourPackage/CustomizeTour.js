import React, { useState } from 'react';
import { Button, FormControl, Select, InputLabel, MenuItem, TextField, Checkbox, FormGroup, FormControlLabel, Typography, Card, CardContent, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faHiking } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './CustomizeTour.css';
import PackageDetails from './PackageDetails.js';

const CustomizeTour = ({ tour = {} }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    destinations: [],
    hotels: '',
    guides: '',
    transport: '',
    mealPlan: '',
    activities: [],
    specialRequests: '',
  });

  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setSelectedOptions({
        ...selectedOptions,
        [name]: checked,
      });
    } else {
      setSelectedOptions({
        ...selectedOptions,
        [name]: value,
      });
    }
  };

  const handleMealSelect = (meal) => {
    setSelectedOptions({
      ...selectedOptions,
      mealPlan: meal,
    });
  };

  const handleActivitySelect = (activity) => {
    setSelectedOptions({
      ...selectedOptions,
      activities: selectedOptions.activities.includes(activity)
        ? selectedOptions.activities.filter((item) => item !== activity)
        : [...selectedOptions.activities, activity],
    });
  };

  const handleConfirm = () => {
    localStorage.setItem('customizedPackage', JSON.stringify(selectedOptions));
    navigate('/view-customized-package');
  };

  return (
    <div className="customize-tour-container">
      <Typography variant="h4" className="title" gutterBottom>
        Customize Your Tour Package: {tour.name}
      </Typography>

      <PackageDetails />

      <Card variant="outlined" className="customization-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Meal Plans <FontAwesomeIcon icon={faUtensils} />
          </Typography>
          <Divider />
          {[
            { name: "Vegetarian", price: "$5" },
            { name: "Vegan", price: "$6" },
            { name: "Local Cuisine", price: "$7" },
            { name: "Seafood", price: "$10" },
            { name: "Buffet", price: "$12" },
          ].map((meal) => (
            <Button
              key={meal.name}
              variant={selectedOptions.mealPlan === meal.name ? "contained" : "outlined"}
              onClick={() => handleMealSelect(meal.name)}
            >
              {meal.name} - {meal.price}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card variant="outlined" className="customization-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Activity Add-Ons <FontAwesomeIcon icon={faHiking} />
          </Typography>
          <Divider />
          {[
            { name: "Hiking", price: "$5" },
            { name: "Safari", price: "$10" },
            { name: "Cultural Experience", price: "$9" },
            { name: "Wildlife Watching", price: "$12" },
          ].map((activity) => (
            <FormControlLabel
              key={activity.name}
              control={
                <Checkbox
                  checked={selectedOptions.activities.includes(activity.name)}
                  onChange={() => handleActivitySelect(activity.name)}
                />
              }
              label={`${activity.name} - ${activity.price}`}
            />
          ))}
        </CardContent>
      </Card>

      <FormControl fullWidth margin="normal">
        <InputLabel>Optional Destinations</InputLabel>
        <Select
          name="destinations"
          multiple
          value={selectedOptions.destinations}
          onChange={handleOptionChange}
        >
          {[
            { name: "Town A", price: "$15" },
            { name: "Town B", price: "$20" },
            { name: "Attraction 1", price: "$25" },
            { name: "Attraction 2", price: "$30" },
          ].map((destination) => (
            <MenuItem key={destination.name} value={destination.name}>
              {destination.name} - {destination.price}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Transportation Mode</InputLabel>
        <Select name="transport" value={selectedOptions.transport} onChange={handleOptionChange}>
          {[
            { name: "Private Car", price: "$50" },
            { name: "Train", price: "$30" },
            { name: "Bus", price: "$20" },
            { name: "Plane", price: "$100" },
          ].map((mode) => (
            <MenuItem key={mode.name} value={mode.name}>
              {mode.name} - {mode.price}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Hotel Selection</InputLabel>
        <Select name="hotels" value={selectedOptions.hotels} onChange={handleOptionChange}>
          {[
            { name: "3-Star", price: "$40" },
            { name: "4-Star", price: "$70" },
            { name: "5-Star", price: "$100" },
          ].map((hotel) => (
            <MenuItem key={hotel.name} value={hotel.name}>
              {hotel.name} - {hotel.price}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        name="specialRequests"
        label="Special Requests"
        value={selectedOptions.specialRequests}
        onChange={handleOptionChange}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleConfirm} style={{ marginTop: '20px' }}>
        Book Package
      </Button>
    </div>
  );
};

export default CustomizeTour;