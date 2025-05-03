import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./AddNewEdit.css";
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

const AddNewEdit = () => {
  const { id } = useParams();
  const [area, setArea] = useState("");
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/areas/${id}`)
      .then((res) => {
        setArea(res.data.area);
        setLocations(res.data.locations || []);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch area details.",
        });
      });
  }, [id]);

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

  const handleAddLocation = () => {
    setLocations([...locations, { name: "", image: "" }]);
  };

  const handleDeleteLocation = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This location will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedLocations = [...locations];
        updatedLocations.splice(index, 1);
        setLocations(updatedLocations);
        Swal.fire("Deleted!", "The location has been deleted.", "success");
      }
    });
  };

  const handleUpdateArea = async (e) => {
    e.preventDefault();  // Prevent form reload

    // Validation
    if (!area.trim() || locations.length === 0) {
      Swal.fire("Error", "Area name and at least one location are required!", "warning");
      return;
    }

    // Log the data to confirm it's correct
    console.log("Sending Data:", { area, locations });

    try {
      // Make the API call to update the area
      const response = await axios.put(`http://localhost:5000/api/areas/${id}`, { area, locations });

      // Log the server response
      console.log("Server Response:", response.data);

      // Show success message
      Swal.fire("Success!", "Area updated successfully!", "success");
      navigate("/addedlocation");
    } catch (error) {
      // Log error response for debugging
      console.error("Error Response:", error.response);

      // Show error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "An error occurred. Please try again.",
      });
    }
  };

  const handleBackToDashboard = () => {
    navigate("/admin");
  };

  return (
    <Box className="add-new-container">
      {/* Header Section */}
      <Box className="header-section">
        <AddLocationIcon className="header-icon" />
        <Typography variant="h3" className="header-title">
          Edit Area Details
        </Typography>
        <Typography variant="body1" className="header-subtitle">
          Modify the area and its locations as required.
        </Typography>
      </Box>

      {/* Form Section */}
      <Box className="form-section">
        <form id="area-form" onSubmit={handleUpdateArea}>
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
            Edit Locations
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
              Update Area
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

export default AddNewEdit;
