import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Container,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./AddedLocations.css";

const Added = () => {
  const [areas, setAreas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/areas")
      .then((res) => setAreas(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEditArea = (areaId) => {
    // Navigate to the Edit Area page
    navigate(`/edit-area/${areaId}`);
  };

  const handleDeleteArea = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/areas/${id}`)
          .then(() => {
            setAreas((prev) => prev.filter((area) => area._id !== id));
            Swal.fire("Deleted!", "The area has been deleted.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Failed to delete the area.", "error");
          });
      }
    });
  };

  const handleBack = () => {
    navigate("/admin");
  };

  return (
    <Box className="added-container">
      <Button
        variant="outlined"
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        className="back-button"
      >
        Back to Dashboard
      </Button>

      <Container className="areas-container">
        <Typography variant="h3" className="page-title">
          Available Areas
        </Typography>
        <br /><br />
        <Grid container spacing={4} justifyContent="center">
          {areas.map((area) => (
            <Grid item xs={12} sm={6} md={4} key={area._id}>
              <Card className="area-card">
                <CardContent className="area-content">
                  <Typography variant="h5" color="primary" className="area-name">
                    {area.area}
                  </Typography>

                  <Divider className="divider" />

                  <Box className="locations-container">
                    <Typography variant="h6" className="locations-title">
                      Locations in {area.area}
                    </Typography>
                    <Box className="location-scroll">
                      {area.locations.map((location, idx) => (
                        <Box className="location-item" key={idx}>
                          <CardMedia
                            component="img"
                            image={location.image}
                            alt={location.name}
                            className="location-image"
                          />
                          <Typography variant="body1" className="location-name">
                            {location.name}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </CardContent>

                <Box className="area-actions">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditArea(area._id)}
                    className="area-action-button"
                    startIcon={<FontAwesomeIcon icon={faEdit} />}
                  >
                    Edit Area
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteArea(area._id)}
                    className="area-action-button"
                    startIcon={<FontAwesomeIcon icon={faTrash} />}
                  >
                    Delete Area
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Added;
