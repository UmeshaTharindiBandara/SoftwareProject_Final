import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./AddPackages.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Box, Typography, TextField, Button, Grid, IconButton } from "@mui/material";
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

  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/tours", {
        name,
        description,
        budget,
        duration,
        highlights: highlights.split(","),
        image,
        meals,
        activities,
        optionalDestinations,
        transportModes,
        guides,
        hotels,
      })
      .then((res) => {
        Swal.fire("Package Added Successfully!", "", "success");
        navigate("/addedpackage");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({ icon: "error", title: "Oops...", text: "An error occurred. Please try again." });
      });
  };

  const handleBackToDashboard = () => {
    navigate("/admin");
  };

  // Function to handle dynamic field changes
  const handleFieldChange = (index, value, setter, fieldList) => {
    const updatedList = [...fieldList];
    updatedList[index] = value;
    setter(updatedList);
  };

  // Function to add a new field
  const addField = (setter, fieldList) => setter([...fieldList, ""]);

  // Function to remove a field
  const removeField = (index, setter, fieldList) => {
    if (fieldList.length > 1) {
      const updatedList = fieldList.filter((_, i) => i !== index);
      setter(updatedList);
    }
  };

  return (
    <Box className="add-packages-container">
      {/* Header Section */}
      <Box className="add-packages-header">
        <TravelExploreIcon className="header-icon" />
        <Typography variant="h3" className="header-title">Add a New Tour Package</Typography>
        <Typography variant="body1" className="header-subtitle">
          Enhance your tourism offerings by adding a package with ease!
        </Typography>
      </Box>

      {/* Form Section */}
      <Box className="form-container">
        <form id="tour-form" onSubmit={handleAdd}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Package Name" variant="outlined" fullWidth required onChange={(e) => setName(e.target.value)} />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Description" variant="outlined" fullWidth multiline rows={4} required onChange={(e) => setDescription(e.target.value)} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField label="Budget (in USD)" variant="outlined" fullWidth type="number" required onChange={(e) => setBudget(e.target.value)} inputProps={{ min: 1 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField label="Duration (e.g., 3 Days)" variant="outlined" fullWidth required onChange={(e) => setDuration(e.target.value)} />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Highlights (comma-separated)" variant="outlined" fullWidth required onChange={(e) => setHighlights(e.target.value)} />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Image URL" variant="outlined" fullWidth required onChange={(e) => setImage(e.target.value)} />
            </Grid>

            {/* Dynamic Fields */}
            {[["Meals", meals, setMeals], ["Activity Add-ons", activities, setActivities], ["Optional Destinations", optionalDestinations, setOptionalDestinations], ["Transport Modes", transportModes, setTransportModes], ["Guide Selections", guides, setGuides], ["Hotel Selections", hotels, setHotels]].map(([label, fieldList, setter]) => (
              <Grid item xs={12} key={label}>
                <Typography variant="h6">{label}</Typography>
                {fieldList.map((value, index) => (
                  <Grid container spacing={1} key={index} alignItems="center">
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        value={value}
                        onChange={(e) => handleFieldChange(index, e.target.value, setter, fieldList)}
                        placeholder={`Enter ${label.toLowerCase()}`}
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

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>Add Package</Button>
            </Grid>

            {/* Back to Dashboard */}
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={handleBackToDashboard}>Back to Dashboard</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AddPackages;
