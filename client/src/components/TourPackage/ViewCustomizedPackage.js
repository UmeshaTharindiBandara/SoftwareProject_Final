import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ViewCustomizedPackage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tour, selectedOptions } = location.state || {};
  const [totalBudget, setTotalBudget] = useState(0);
  const [breakdown, setBreakdown] = useState({});

  useEffect(() => {
    if (tour && selectedOptions) {
      calculateTotalBudget(selectedOptions);
    }
  }, [tour, selectedOptions]);

  const calculateTotalBudget = (packageData) => {
    let total = 0;
    let breakdown = {};

    // Meal Plan
    const mealIndex = tour.categories.meals.indexOf(packageData.mealPlan);
    let mealBudget = mealIndex !== -1 ? tour.budgets.mealBudgets[mealIndex] : 0;
    breakdown.mealPlan = mealBudget;
    total += mealBudget;

    // Activities
    let activityBudget = packageData.activities.reduce((sum, activity) => {
      let index = tour.categories.activities.indexOf(activity);
      return sum + (index !== -1 ? tour.budgets.activityBudgets[index] : 0);
    }, 0);
    breakdown.activities = activityBudget;
    total += activityBudget;

    // Transport
    let transportIndex = tour.categories.transportModes.indexOf(packageData.transport);
    let transportBudget = transportIndex !== -1 ? tour.budgets.transportModeBudgets[transportIndex] : 0;
    breakdown.transport = transportBudget;
    total += transportBudget;

    // Hotel
    let hotelIndex = tour.categories.hotels.indexOf(packageData.hotels);
    let hotelBudget = hotelIndex !== -1 ? tour.budgets.hotelBudgets[hotelIndex] : 0;
    breakdown.hotels = hotelBudget;
    total += hotelBudget;

    // Destinations
    let destinationBudget = packageData.destinations.reduce((sum, destination) => {
      let index = tour.categories.optionalDestinations.indexOf(destination);
      return sum + (index !== -1 ? tour.budgets.optionalDestinationBudgets[index] : 0);
    }, 0);
    breakdown.destinations = destinationBudget;
    total += destinationBudget;

    setBreakdown(breakdown);
    setTotalBudget(total);
  };

  return (
    <div className="customized-package-container">
      <Typography variant="h4" gutterBottom>
        Customized Package Summary
      </Typography>
      <Card variant="outlined" className="summary-card">
        <CardContent>
          <Typography variant="h6">Selected Options & Budget</Typography>
          <Divider />
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {Object.entries(breakdown).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key.replace(/([A-Z])/g, ' $1').trim()}</TableCell>
                    <TableCell>${value}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell><strong>Total Budget</strong></TableCell>
                  <TableCell><strong>${totalBudget}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/payment", { state: { totalBudget } })}
        style={{ marginTop: "20px" }}
      >
        Proceed to Payment
      </Button>
    </div>
  );
};

export default ViewCustomizedPackage;
