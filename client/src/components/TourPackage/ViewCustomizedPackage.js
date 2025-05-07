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
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Swal from "sweetalert2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./ViewCustomizedPackage.css";

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
    let transportIndex = tour.categories.transportModes.indexOf(
      packageData.transport
    );
    let transportBudget =
      transportIndex !== -1
        ? tour.budgets.transportModeBudgets[transportIndex]
        : 0;
    breakdown.transport = transportBudget;
    total += transportBudget;

    // Hotel
    let hotelIndex = tour.categories.hotels.indexOf(packageData.hotels);
    let hotelBudget =
      hotelIndex !== -1 ? tour.budgets.hotelBudgets[hotelIndex] : 0;
    breakdown.hotels = hotelBudget;
    total += hotelBudget;

    // Destinations
    let destinationBudget = packageData.destinations.reduce(
      (sum, destination) => {
        let index = tour.categories.optionalDestinations.indexOf(destination);
        return (
          sum +
          (index !== -1 ? tour.budgets.optionalDestinationBudgets[index] : 0)
        );
      },
      0
    );
    breakdown.destinations = destinationBudget;
    total += destinationBudget;

    setBreakdown(breakdown);
    setTotalBudget(total);
  };

  const stripePromise = loadStripe(
    "pk_test_51Qdni3AQTkEktI7BiiQZbG3IGUL7nU4zlU9cj0O5iv3PARf6GbmNAyVXxh63hFeoUmIKTWzgMk1f2oYKSnJDooSU00usewESDx"
  );

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "https://softwareproject-server.onrender.com/api/checkout",
        {
          totalBudget,
        }
      );

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.id, // Use session ID from backend
      });

      if (error) throw error;
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      // Get user ID from localStorage or context
      const user = JSON.parse(localStorage.getItem("user")); 
      const userId = user?._id;

      if (!userId) {
        Swal.fire({
          icon: "warning",
          title: "Please Login",
          text: "You need to be logged in to add items to cart",
        });
        navigate("/login");
        return;
      }

      const cartData = {
        userId,
        packageDetails: {
          tour,
          selectedOptions,
          totalBudget,
          breakdown,
        },
      };

      const response = await axios.post(
        "https://softwareproject-server.onrender.com/api/cart/add",
        cartData
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Added to Cart!",
          text: "Package has been added to your cart",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/profile");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Add to Cart",
        text: error.response?.data?.message || "Please try again later",
      });
    }
  };

  return (
    <div className="custom-package__wrapper">
      <Typography variant="h4" gutterBottom className="custom-package__title">
        Customized Package Summary
      </Typography>

      <Card variant="outlined" className="custom-package__card">
        <CardContent>
          <Typography variant="h6">Selected Options & Budget</Typography>
          <Divider />
          <TableContainer
            component={Paper}
            className="custom-package__table-container"
          >
            <Table className="custom-package__table">
              <TableBody>
                {Object.entries(breakdown).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="custom-package__table-cell">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </TableCell>
                    <TableCell className="custom-package__table-cell">
                      ${value}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="custom-package__table-cell custom-package__table-cell--total">
                    <strong>Total Budget</strong>
                  </TableCell>
                  <TableCell className="custom-package__table-cell custom-package__table-cell--total">
                    <strong>${totalBudget}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <div className="custom-package__button-container">
        <Button
          variant="contained"
          onClick={handlePayment}
          className="custom-package__button--payment"
        >
          Proceed to Payment
        </Button>

        <Button
          variant="contained"
          onClick={handleAddToCart}
          startIcon={<ShoppingCartIcon />}
          className="custom-package__button--cart"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ViewCustomizedPackage;
