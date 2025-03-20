import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Card, CardContent, Divider } from '@mui/material';
import './SelectedPackage.css';

const SelectedPackage = () => {
  const location = useLocation();
  const { selectedAccommodation, selectedTransport, selectedTourGuide, selectedMeals } = location.state;

  const calculateBudget = () => {
    const prices = {
      accommodation: {
        "Budget Hotel": { min: 30, max: 50 },
        "Mid-Range Hotel": { min: 60, max: 100 },
        "Luxury Resort": { min: 120, max: 200 },
        "Homestay": { min: 25, max: 40 },
        "Tent Camping": { min: 15, max: 25 },
      },
      transport: {
        "Private Car": { min: 60, max: 100 },
        "Group Tour Bus": { min: 30, max: 50 },
        "Luxury Van": { min: 80, max: 150 },
        "Tuk-Tuk Ride": { min: 10, max: 20 },
        "Train + Local Transport": { min: 10, max: 30 },
      },
      tourGuide: {
        "Local Guide": { min: 25, max: 50 },
        "No Guide": { min: 0, max: 0 },
      },
      meals: {
        "Breakfast Included": { min: 5, max: 10 },
        "Full Meal": { min: 15, max: 25 },
        "Vegetarian Meal": { min: 10, max: 15 },
        "Special Dietary": { min: 10, max: 20 },
      },
    };

    const getRandomValue = ({ min, max }) => Math.floor(Math.random() * (max - min + 1)) + min;

    const total =
      getRandomValue(prices.accommodation[selectedAccommodation]) +
      getRandomValue(prices.transport[selectedTransport]) +
      getRandomValue(prices.tourGuide[selectedTourGuide]) +
      getRandomValue(prices.meals[selectedMeals]);

    return total;
  };

  const totalBudget = calculateBudget();

  return (
    <div className="selected-package-container">
      <Typography variant="h4" className="title" gutterBottom>
        Your Customized Tour Package
      </Typography>

      <Card variant="outlined" className="package-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Selected Options:
          </Typography>
          <Divider />
          <Typography variant="body1">
            <strong>Accommodation:</strong> {selectedAccommodation}
          </Typography>
          <Typography variant="body1">
            <strong>Transport:</strong> {selectedTransport}
          </Typography>
          <Typography variant="body1">
            <strong>Tour Guide:</strong> {selectedTourGuide}
          </Typography>
          <Typography variant="body1">
            <strong>Meals:</strong> {selectedMeals}
          </Typography>
          <Divider />
          <Typography variant="h6" className="total-budget">
            Total Budget: ${totalBudget}
          </Typography>
        </CardContent>
      </Card>

      <button className="payment-button">Proceed to Payment</button>
    </div>
  );
};

export default SelectedPackage;