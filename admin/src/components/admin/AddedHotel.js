import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HotelIcon from "@mui/icons-material/Hotel";
import "./AddedHotel.css";

const HotelList = () => {
  const [areas, setAreas] = useState([]);
  const [hotelsByArea, setHotelsByArea] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/areas")
      .then((res) => setAreas(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleBack = () => {
    navigate("/admin");
  };

  const fetchHotelsForArea = (areaId) => {
    axios
      .get(`http://localhost:5000/api/hotels?areaId=${areaId}`)
      .then((res) => {
        setHotelsByArea((prev) => ({
          ...prev,
          [areaId]: res.data,
        }));
      })
      .catch((err) => console.error("Error fetching hotels:", err));
  };

  const handleEditHotel = (hotelId) => {
    navigate(`/edit-hotel/${hotelId}`);
  };

  const handleDeleteHotel = (hotelId, areaId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/hotels/${hotelId}`)
          .then(() => {
            setHotelsByArea((prev) => ({
              ...prev,
              [areaId]: prev[areaId].filter((hotel) => hotel._id !== hotelId),
            }));
            Swal.fire("Deleted!", "The hotel has been removed.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Failed to delete the hotel.", "error");
          });
      }
    });
  };

  return (
    <div className="hotel-list-container">
      <Button
        variant="outlined"
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        className="back-to-dashboard"
      >
        Back to Dashboard
      </Button>

      <h1 className="hotel-page-title">Explore Available Hotels</h1>

      {areas.map((area) => (
        <Accordion key={area._id} className="hotel-area-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${area._id}-content`}
            id={`panel-${area._id}-header`}
            onClick={() => fetchHotelsForArea(area._id)}
          >
            <HotelIcon className="area-icon" />
            <Typography variant="h6">{area.area}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {hotelsByArea[area._id] && hotelsByArea[area._id].length > 0 ? (
              <div className="hotels-wrapper">
                <h4 className="hotel-section-title">Hotels in {area.area}</h4>
                <Grid container spacing={3}>
                  {hotelsByArea[area._id].map((hotel) => (
                    <Grid item xs={12} sm={6} md={4} key={hotel._id}>
                      <Card className="hotel-card">
                        <CardContent>
                          <Typography variant="h6" className="hotel-name">
                            {hotel.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Price: ${hotel.price} | Rating: ⭐{hotel.rating}
                          </Typography>

                          {/* Image Gallery Section */}
                          <Box className="hotel-gallery">
                            <img
                              src={hotel.image}
                              alt={hotel.name}
                              className="hotel-thumbnail"
                            />
                          </Box>
                        </CardContent>

                        <div className="hotel-card-actions">
                          <Tooltip title="Edit Hotel" placement="top">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleEditHotel(hotel._id)}
                              className="hotel-action-btn"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                              Edit
                            </Button>
                          </Tooltip>

                          <Tooltip title="Delete Hotel" placement="top">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleDeleteHotel(hotel._id, area._id)}
                              className="hotel-action-btn"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                              Delete
                            </Button>
                          </Tooltip>
                        </div>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            ) : (
              <Typography>No hotels found in {area.area}</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default HotelList;
