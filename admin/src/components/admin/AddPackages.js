import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./AddPackages.css";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const AddPackages = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [highlights, setHighlights] = useState("");
  const [image, setImage] = useState("");

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
  const [optionalDestinationBudgets, setOptionalDestinationBudgets] = useState([
    null,
  ]);
  const [transportModeBudgets, setTransportModeBudgets] = useState([null]);
  const [guideBudgets, setGuideBudgets] = useState([null]);
  const [hotelBudgets, setHotelBudgets] = useState([null]);

  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post("http://10.50.227.117:5000/api/tours", {
        name,
        description,
        budget,
        duration,
        highlights: highlights.split(","),
        image,
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
        Swal.fire("Package Added Successfully!", "", "success");
        navigate("/addedpackage");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred. Please try again.",
        });
      });
  };

  const handleBackToDashboard = () => {
    navigate("/admin");
  };

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

  const budgetSetter = (index, updatedBudgetList, value) => {
    const budgetAmount = value ? parseInt(value) : null; // Change to null for empty values
    updatedBudgetList[index] = budgetAmount;
    return updatedBudgetList;
  };

  const addField = (setter, fieldList) => {
    setter([...fieldList, ""]); // Add empty field
  };

  const removeField = (index, setter, fieldList) => {
    if (fieldList.length > 1) {
      setter(fieldList.filter((_, i) => i !== index));
    }
  };

  return (
    <Box className="add-packages-container">
      <Box className="add-packages-header">
        <TravelExploreIcon className="header-icon" />
        <Typography variant="h3" className="header-title">
          Add a New Tour Package
        </Typography>
        <Typography variant="body1" className="header-subtitle">
          Enhance your tourism offerings by adding a package with ease!
        </Typography>
      </Box>

      <Box className="form-container">
        <form id="tour-form" onSubmit={handleAdd}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Package Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Budget (in USD)"
                variant="outlined"
                fullWidth
                type="number"
                required
                onChange={(e) => setBudget(e.target.value)}
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration (e.g., 3 Days)"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setDuration(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Highlights (comma-separated)"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setHighlights(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setImage(e.target.value)}
              />
            </Grid>

            {[
              ["Meals", meals, setMeals, mealBudgets, setMealBudgets],
              [
                "Activity Add-ons",
                activities,
                setActivities,
                activityBudgets,
                setActivityBudgets,
              ],
              [
                "Optional Destinations",
                optionalDestinations,
                setOptionalDestinations,
                optionalDestinationBudgets,
                setOptionalDestinationBudgets,
              ],
              [
                "Transport Modes",
                transportModes,
                setTransportModes,
                transportModeBudgets,
                setTransportModeBudgets,
              ],
              [
                "Guide Selections",
                guides,
                setGuides,
                guideBudgets,
                setGuideBudgets,
              ],
              [
                "Hotel Selections",
                hotels,
                setHotels,
                hotelBudgets,
                setHotelBudgets,
              ],
            ].map(([label, fieldList, setter, budgetList, budgetSetter]) => (
              <Grid item xs={12} key={label}>
                <Typography variant="h6">{label}</Typography>
                {fieldList.map((value, index) => (
                  <Grid container spacing={1} key={index} alignItems="center">
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={value}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            e.target.value,
                            setter,
                            fieldList
                          )
                        }
                        placeholder={`Enter ${label.toLowerCase()}`}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        value={
                          budgetList[index] !== null ? budgetList[index] : ""
                        }
                        onChange={(e) =>
                          handleBudgetChange(
                            index,
                            e.target.value,
                            budgetSetter,
                            budgetList
                          )
                        }
                        placeholder={`Set budget `}
                        type="number"
                        inputProps={{ min: 0 }}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        onClick={() => addField(setter, fieldList)}
                        color="primary"
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>

                      {fieldList.length > 1 && (
                        <IconButton
                          onClick={() => removeField(index, setter, fieldList)}
                          color="error"
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Add Package
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AddPackages;
