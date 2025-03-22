import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import "./EditPackages.css";
import axios from "axios";
import Swal from "sweetalert2";
import { TextField, Button, Box, Typography, Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const EditPackages = () => {
  const [packageData, setPackageData] = useState({
    name: "",
    description: "",
    budget: "",
    duration: "",
    highlights: "",
    image: "",
  });

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

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tours/${id}`)
      .then((res) => {
        const {
          name,
          description,
          budget,
          duration,
          highlights,
          image,
          categories,
          budgets,
        } = res.data.data;

        setPackageData({
          name,
          description,
          budget,
          duration,
          highlights: highlights.join(", "),
          image,
        });

        // Set dynamic fields
        setMeals(categories.meals || [""]);
        setActivities(categories.activities || [""]);
        setOptionalDestinations(categories.optionalDestinations || [""]);
        setTransportModes(categories.transportModes || [""]);
        setGuides(categories.guides || [""]);
        setHotels(categories.hotels || [""]);

        // Set budgets for dynamic fields
        setMealBudgets(budgets.mealBudgets || [null]);
        setActivityBudgets(budgets.activityBudgets || [null]);
        setOptionalDestinationBudgets(budgets.optionalDestinationBudgets || [null]);
        setTransportModeBudgets(budgets.transportModeBudgets || [null]);
        setGuideBudgets(budgets.guideBudgets || [null]);
        setHotelBudgets(budgets.hotelBudgets || [null]);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to fetch package details. Please try again later.", "error");
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPackageData({ ...packageData, [name]: value });
  };

  const handleFieldChange = (index, value, setter, fieldList) => {
    const updatedList = [...fieldList];
    updatedList[index] = value;
    setter(updatedList);
  };

  const handleBudgetChange = (index, value, setter, budgetList) => {
    const updatedBudgetList = [...budgetList];
    updatedBudgetList[index] = value ? parseInt(value) : null;
    setter(updatedBudgetList);
  };

  const addField = (setter, fieldList, budgetSetter, budgetList) => {
    setter([...fieldList, ""]);
    budgetSetter([...budgetList, null]);
  };

  const removeField = (index, setter, fieldList, budgetSetter, budgetList) => {
    if (fieldList.length > 1) {
      setter(fieldList.filter((_, i) => i !== index));
      budgetSetter(budgetList.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/tours/${id}`, {
        ...packageData,
        highlights: packageData.highlights.split(","),
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
      .then(() => {
        Swal.fire("Updated!", "Your package has been updated.", "success");
        navigate(`/addedpackage`);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update the package", "error");
      });
  };

  return (
    <Box className="edit-package-container">
      <Box className="header-section">
        <Typography variant="h3" className="header-title">Edit Tour Package</Typography>
        <Typography variant="body1" className="header-subtitle">
          Update the details of your existing tour package.
        </Typography>
      </Box>

      <form id="tour-form" onSubmit={handleSubmit}>
        <Box className="form-section">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField name="name" label="Package Name" variant="outlined" fullWidth required value={packageData.name} onChange={handleInputChange} />
            </Grid>

            <Grid item xs={12}>
              <TextField name="description" label="Description" variant="outlined" fullWidth multiline rows={4} required value={packageData.description} onChange={handleInputChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField name="budget" label="Budget (in USD)" variant="outlined" fullWidth type="number" required value={packageData.budget} onChange={handleInputChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField name="duration" label="Duration" variant="outlined" fullWidth required value={packageData.duration} onChange={handleInputChange} />
            </Grid>

            <Grid item xs={12}>
              <TextField name="highlights" label="Highlights (comma-separated)" variant="outlined" fullWidth required value={packageData.highlights} onChange={handleInputChange} />
            </Grid>

            <Grid item xs={12}>
              <TextField name="image" label="Image URL" variant="outlined" fullWidth required value={packageData.image} onChange={handleInputChange} />
            </Grid>

            {[["Meals", meals, setMeals, mealBudgets, setMealBudgets], ["Activity Add-ons", activities, setActivities, activityBudgets, setActivityBudgets], ["Optional Destinations", optionalDestinations, setOptionalDestinations, optionalDestinationBudgets, setOptionalDestinationBudgets], ["Transport Modes", transportModes, setTransportModes, transportModeBudgets, setTransportModeBudgets], ["Guide Selections", guides, setGuides, guideBudgets, setGuideBudgets], ["Hotel Selections", hotels, setHotels, hotelBudgets, setHotelBudgets]].map(([label, fieldList, setter, budgetList, budgetSetter]) => (
              <Grid item xs={12} key={label}>
                <Typography variant="h6">{label}</Typography>
                {fieldList.map((value, index) => (
                  <Grid container spacing={1} key={index} alignItems="center">
                    <Grid item xs={6}>
                      <TextField fullWidth value={value} onChange={(e) => handleFieldChange(index, e.target.value, setter, fieldList)} />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>Update Package</Button>
              <Button variant="outlined" fullWidth onClick={() => navigate("/admin")} startIcon={<ArrowBackIcon />}>Back to Dashboard</Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

export default EditPackages;
