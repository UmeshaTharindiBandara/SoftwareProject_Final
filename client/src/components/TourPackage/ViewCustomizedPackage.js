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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Add this at the top of your component
// Use your actual key

const ViewCustomizedPackage = () => {
  const [customizedPackage, setCustomizedPackage] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgetDetails, setBudgetDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedPackage = JSON.parse(localStorage.getItem("customizedPackage"));
    if (storedPackage) {
      setCustomizedPackage(storedPackage);
    }

    // Simulating fetching package details (Ideally, fetch from API)
    const fetchedPackageDetails = {
      name: "Galle Fort",
      baseBudget: 150, // base budget for the package
      duration: "1 Day",
      highlights: ["Dutch Reformed Church", "Lighthouse", "Fort Walls"],
    };

    setPackageDetails(fetchedPackageDetails);
  }, []);

  useEffect(() => {
    if (customizedPackage && packageDetails) {
      calculateTotalBudget(customizedPackage); // Only calculate when data is available
    }
  }, [customizedPackage, packageDetails]);

  const calculateTotalBudget = (packageData) => {
    let total = 0;
    let breakdown = {};

    if (packageDetails) {
      // Base package budget
      let baseBudget = parseFloat(packageDetails.baseBudget || 0);
      breakdown.baseBudget = baseBudget;
      total += baseBudget;

      // Meal plan budget
      const mealPrices = {
        Vegetarian: 5,
        Vegan: 6,
        "Local Cuisine": 7,
        Seafood: 10,
        Buffet: 12,
      };
      let mealBudget = 0;
      if (packageData.mealPlan) {
        mealBudget = mealPrices[packageData.mealPlan] || 0;
        breakdown.mealPlan = mealBudget;
        total += mealBudget;
      }

      // Activity costs
      const activityPrices = {
        Hiking: 5,
        Safari: 10,
        "Cultural Experience": 9,
        "Wildlife Watching": 12,
      };
      let activityBudget = 0;
      if (packageData.activities) {
        activityBudget = packageData.activities.reduce(
          (sum, activity) => sum + (activityPrices[activity] || 0),
          0
        );
        breakdown.activities = activityBudget;
        total += activityBudget;
      }

      // Transport budget
      const transportPrices = {
        "Private Car": 50,
        Train: 30,
        Bus: 20,
        Plane: 100,
      };
      let transportBudget = 0;
      if (packageData.transport) {
        transportBudget = transportPrices[packageData.transport] || 0;
        breakdown.transport = transportBudget;
        total += transportBudget;
      }

      // Hotel budget
      const hotelPrices = {
        "3-Star": 40,
        "4-Star": 70,
        "5-Star": 100,
      };
      let hotelBudget = 0;
      if (packageData.hotels) {
        hotelBudget = hotelPrices[packageData.hotels] || 0;
        breakdown.hotels = hotelBudget;
        total += hotelBudget;
      }

      // Destination budget
      const destinationPrices = {
        "Town A": 15,
        "Town B": 20,
        "Attraction 1": 25,
        "Attraction 2": 30,
      };
      let destinationBudget = 0;
      if (packageData.destinations) {
        destinationBudget = packageData.destinations.reduce(
          (sum, destination) => sum + (destinationPrices[destination] || 0),
          0
        );
        breakdown.destinations = destinationBudget;
        total += destinationBudget;
      }

      // Set final total and breakdown
      setTotalBudget(total);
      setBudgetDetails(breakdown);
    }
  };

  const stripePromise = loadStripe(
    "pk_test_51Qdni3AQTkEktI7BiiQZbG3IGUL7nU4zlU9cj0O5iv3PARf6GbmNAyVXxh63hFeoUmIKTWzgMk1f2oYKSnJDooSU00usewESDx"
  );

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/checkout", {
        totalBudget,
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Card
        variant="outlined"
        style={{
          maxWidth: "800px",
          width: "100%",
          padding: "20px",
          background: "#f9f9f9",
        }}
      >
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Customized Tour Budget Report
          </Typography>
          <Divider style={{ marginBottom: "20px" }} />

          {/* Package Overview */}
          {packageDetails && (
            <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Destination</strong>
                    </TableCell>
                    <TableCell>{packageDetails.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Duration</strong>
                    </TableCell>
                    <TableCell>{packageDetails.duration}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Base Budget</strong>
                    </TableCell>
                    <TableCell>${packageDetails.baseBudget}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Highlights</strong>
                    </TableCell>
                    <TableCell>
                      {packageDetails.highlights.join(", ")}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Customized Selections */}
          {customizedPackage ? (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Meal Plan</strong>
                    </TableCell>
                    <TableCell>
                      {customizedPackage.mealPlan || "Not Selected"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Activities</strong>
                    </TableCell>
                    <TableCell>
                      {customizedPackage.activities.length > 0
                        ? customizedPackage.activities.join(", ")
                        : "No activities selected"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Transportation</strong>
                    </TableCell>
                    <TableCell>
                      {customizedPackage.transport || "Not Selected"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Hotel</strong>
                    </TableCell>
                    <TableCell>
                      {customizedPackage.hotels || "Not Selected"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Guide</strong>
                    </TableCell>
                    <TableCell>
                      {customizedPackage.guides || "Not Selected"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Special Requests</strong>
                    </TableCell>
                    <TableCell>
                      {customizedPackage.specialRequests || "None"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography align="center" color="textSecondary">
              No package selected
            </Typography>
          )}

          {/* Individual Budget Breakdown */}
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableBody>
                {Object.entries(budgetDetails).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>
                      <strong>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </strong>
                    </TableCell>
                    <TableCell>${value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Total Budget Section */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Typography variant="h5" color="primary">
              Total Budget: ${totalBudget}
            </Typography>
          </div>

          {/* Back Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button variant="contained" color="primary" onClick={handlePayment}>
              Proceed to Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewCustomizedPackage;
