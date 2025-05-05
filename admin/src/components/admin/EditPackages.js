import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Box, Typography, TextField, Button, Grid, IconButton } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const EditPackages = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);

  // Dynamic Fields
  const [meals, setMeals] = useState([""]);
  const [activities, setActivities] = useState([""]);
  const [optionalDestinations, setOptionalDestinations] = useState([""]);
  const [transportModes, setTransportModes] = useState([""]);
  const [guides, setGuides] = useState([""]);
  const [hotels, setHotels] = useState([""]);

  // Budgets for each dynamic field
  const [mealBudgets, setMealBudgets] = useState([null]);
  const [activityBudgets, setActivityBudgets] = useState([null]);
  const [optionalDestinationBudgets, setOptionalDestinationBudgets] = useState([null]);
  const [transportModeBudgets, setTransportModeBudgets] = useState([null]);
  const [guideBudgets, setGuideBudgets] = useState([null]);
  const [hotelBudgets, setHotelBudgets] = useState([null]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tours/${id}`)
      .then((res) => {
        setTour(res.data.data);
        // Set initial data
        setMeals(res.data.data.categories.meals);
        setActivities(res.data.data.categories.activities);
        setOptionalDestinations(res.data.data.categories.optionalDestinations);
        setTransportModes(res.data.data.categories.transportModes);
        setGuides(res.data.data.categories.guides);
        setHotels(res.data.data.categories.hotels);
        setMealBudgets(res.data.data.budgets.mealBudgets);
        setActivityBudgets(res.data.data.budgets.activityBudgets);
        setOptionalDestinationBudgets(res.data.data.budgets.optionalDestinationBudgets);
        setTransportModeBudgets(res.data.data.budgets.transportModeBudgets);
        setGuideBudgets(res.data.data.budgets.guideBudgets);
        setHotelBudgets(res.data.data.budgets.hotelBudgets);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({ icon: "error", title: "Oops...", text: "An error occurred. Please try again." });
      });
  }, [id]);

  const handleFieldChange = (index, value, setter, fieldList) => {
    const updatedList = [...fieldList];
    updatedList[index] = value;
    setter(updatedList);
  };

  const handleBudgetChange = (index, value, setter, budgetList) => {
    const updatedBudgetList = [...budgetList];
    updatedBudgetList[index] = value ? parseInt(value) : null; // Convert to number or set null
    setter(updatedBudgetList);
  };

  const addField = (setter, fieldList) => {
    setter([...fieldList, ""]); // Add empty field
  };

  const removeField = (index, setter, fieldList) => {
    if (fieldList.length > 1) {
      setter(fieldList.filter((_, i) => i !== index));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/tours/${id}`, {
        name: tour.name,
        description: tour.description,
        budget: tour.budget,
        duration: tour.duration,
        highlights: tour.highlights,
        image: tour.image,
        categories: {
          meals,
          activities,
          optionalDestinations,
          transportModes,
          guides,
          hotels,
        },
        budgets: {
          mealBudgets,
          activityBudgets,
          optionalDestinationBudgets,
          transportModeBudgets,
          guideBudgets,
          hotelBudgets,
        },
      })
      .then((res) => {
        Swal.fire("Package Updated Successfully!", "", "success");
        navigate("/addedpackage");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({ icon: "error", title: "Oops...", text: "An error occurred. Please try again." });
      });
  };

  if (!tour) return <p>Loading...</p>;

  return (
    <Box className="add-packages-container">
      <Box className="add-packages-header">
      <TravelExploreIcon className="header-icon" />
        <Typography variant="h3" className="header-title">Edit Tour Package</Typography>
        <Typography variant="body1" className="header-subtitle">
          Update the details of your existing package.
        </Typography>
      </Box>

      <Box className="form-container">
        <form id="tour-form" onSubmit={handleUpdate}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Package Name"
                variant="outlined"
                fullWidth
                required
                value={tour.name}
                onChange={(e) => setTour({ ...tour, name: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
                value={tour.description}
                onChange={(e) => setTour({ ...tour, description: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Budget (in USD)"
                variant="outlined"
                fullWidth
                type="number"
                required
                value={tour.budget}
                onChange={(e) => setTour({ ...tour, budget: e.target.value })}
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration (e.g., 3 Days)"
                variant="outlined"
                fullWidth
                required
                value={tour.duration}
                onChange={(e) => setTour({ ...tour, duration: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Highlights (comma-separated)"
                variant="outlined"
                fullWidth
                required
                value={tour.highlights}
                onChange={(e) => setTour({ ...tour, highlights: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                required
                value={tour.image}
                onChange={(e) => setTour({ ...tour, image: e.target.value })}
              />
            </Grid>

            {[["Meals", meals, setMeals, mealBudgets, setMealBudgets], ["Activity Add-ons", activities, setActivities, activityBudgets, setActivityBudgets], ["Optional Destinations", optionalDestinations, setOptionalDestinations, optionalDestinationBudgets, setOptionalDestinationBudgets], ["Transport Modes", transportModes, setTransportModes, transportModeBudgets, setTransportModeBudgets], ["Guide Selections", guides, setGuides, guideBudgets, setGuideBudgets], ["Hotel Selections", hotels, setHotels, hotelBudgets, setHotelBudgets]].map(([label, fieldList, setter, budgetList, budgetSetter]) => (
              <Grid item xs={12} key={label}>
                <Typography variant="h6">{label}</Typography>
                {fieldList.map((value, index) => (
                  <Grid container spacing={1} key={index} alignItems="center">
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={value}
                        onChange={(e) => handleFieldChange(index, e.target.value, setter, fieldList)}
                        placeholder={`Enter ${label.toLowerCase()}`}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        value={budgetList[index] !== null ? budgetList[index] : ""}
                        onChange={(e) => handleBudgetChange(index, e.target.value, budgetSetter, budgetList)}
                        placeholder={`Set budget`}
                        type="number"
                        inputProps={{ min: 0 }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={() => addField(setter, fieldList)} color="primary">
                        <AddCircleOutlineIcon />
                      </IconButton>
                      {fieldList.length > 1 && (
                        <IconButton onClick={() => removeField(index, setter, fieldList)} color="error">
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>Update Package</Button>
            </Grid>

            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={() => navigate("/admin")}>Back to Dashboard</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default EditPackages;