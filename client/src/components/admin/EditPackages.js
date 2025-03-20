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
          meals,
          activities,
          optionalDestinations,
          transportModes,
          guides,
          hotels,
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
        setMeals(meals || [""]);
        setActivities(activities || [""]);
        setOptionalDestinations(optionalDestinations || [""]);
        setTransportModes(transportModes || [""]);
        setGuides(guides || [""]);
        setHotels(hotels || [""]);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/tours/${id}`, {
        ...packageData,
        highlights: packageData.highlights.split(","),
        meals,
        activities,
        optionalDestinations,
        transportModes,
        guides,
        hotels,
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
        <Typography variant="h3" className="header-title">
          Edit Tour Package
        </Typography>
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

            {/* Dynamic Fields */}
            {[["Meals", meals, setMeals], ["Activity Add-ons", activities, setActivities], ["Optional Destinations", optionalDestinations, setOptionalDestinations], ["Transport Modes", transportModes, setTransportModes], ["Guide Selections", guides, setGuides], ["Hotel Selections", hotels, setHotels]].map(([label, fieldList, setter]) => (
              <Grid item xs={12} key={label}>
                <Typography variant="h6">{label}</Typography>
                {fieldList.map((value, index) => (
                  <Grid container spacing={1} key={index} alignItems="center">
                    <Grid item xs={10}>
                      <TextField fullWidth value={value} onChange={(e) => handleFieldChange(index, e.target.value, setter, fieldList)} placeholder={`Enter ${label.toLowerCase()}`} />
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

            <Grid item xs={12} className="form-actions">
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
