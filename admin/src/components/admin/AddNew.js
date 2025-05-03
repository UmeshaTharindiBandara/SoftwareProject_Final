import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AddNew.css";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  IconButton, 
  Card, 
  CardContent, 
  CardActions 
} from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import DeleteIcon from "@mui/icons-material/Delete";
import LandscapeIcon from "@mui/icons-material/Landscape";
import CollectionsIcon from "@mui/icons-material/Collections";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddNew = () => {
  const [area, setArea] = useState("");
  const [locations, setLocations] = useState([{ name: "", image: "" }]);
  const [areas, setAreas] = useState([]);
  const navigate = useNavigate();

  const handleAddLocation = () => {
    setLocations([...locations, { name: "", image: "" }]);
  };

  const handleDeleteLocation = (index) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
  };

  const handleLocationChange = (index, value) => {
    const updatedLocations = [...locations];
    updatedLocations[index].name = value;
    setLocations(updatedLocations);
  };

  const handleImageChange = (index, value) => {
    const updatedLocations = [...locations];
    updatedLocations[index].image = value;
    setLocations(updatedLocations);
  };

  const handleAddArea = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/areas", { area, locations });
      Swal.fire("Success!", "The new area has been added!", "success");
      navigate("/addedlocation");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred. Please try again.",
      });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/areas")
      .then((res) => setAreas(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleBackToDashboard = () => {
    navigate("/admin");
  };

  return (
    <Box className="add-new-container">
      {/* Header Section */}
      <Box className="header-section">
        <AddLocationIcon className="header-icon" />
        <Typography variant="h3" className="header-title">
          Add a New Area
        </Typography>
        <Typography variant="body1" className="header-subtitle">
          Organize your tourism offerings by creating new areas and adding exciting locations!
        </Typography>
      </Box>

      {/* Form Section */}
      <Box className="form-section">
        <form id="area-form" onSubmit={handleAddArea}>
          {/* Area Name Input */}
          <Card className="input-card">
            <CardContent>
              <Typography variant="h6">Area Information</Typography>
              <TextField
                label="Area Name"
                variant="outlined"
                fullWidth
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Locations */}
          <Typography variant="h6" className="locations-title">
            Add Locations
          </Typography>
          {locations.map((location, index) => (
            <Card className="input-card" key={index}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={`Location ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      required
                      value={location.name}
                      onChange={(e) => handleLocationChange(index, e.target.value)}
                      InputProps={{
                        startAdornment: <LandscapeIcon className="input-icon" />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Image URL"
                      variant="outlined"
                      fullWidth
                      required
                      value={location.image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      InputProps={{
                        startAdornment: <CollectionsIcon className="input-icon" />,
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <IconButton
                  className="delete-button"
                  onClick={() => handleDeleteLocation(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
          <br/>

          <Button
            variant="outlined"
            className="add-location-button"
            onClick={handleAddLocation}
            startIcon={<AddLocationIcon />}
          >
            Add Another Location
          </Button>

          {/* Form Submission */}
          <Box className="form-actions">
            <Button
              variant="contained"
              type="submit"
              className="submit-button"
            >
              Add Area
            </Button>
            <Button
              variant="outlined"
              onClick={handleBackToDashboard}
              className="back-button"
              startIcon={<ArrowBackIcon />}
            >
              Back to Dashboard
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddNew;
