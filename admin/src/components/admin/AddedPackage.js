import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./AddedPackages.css";

const AddedPackage = () => {
  const [tours, setTours] = useState([]);
  const [area, setArea] = useState("");
  const [locations, setLocations] = useState([{ name: "", image: "" }]);
  const [areas, setAreas] = useState([]);
  const [editingArea, setEditingArea] = useState(null);
  const navigate = useNavigate();

  const [ratings, setRatings] = useState({});
  const [likes, setLikes] = useState({});

  useEffect(() => {
    axios
      .get("https://softwareproject-server.onrender.com/api/tours")
      .then((res) => {
        setTours(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("https://softwareproject-server.onrender.com/api/areas")
      .then((res) => setAreas(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://softwareproject-server.onrender.com/api/tours/${id}`)
          .then(() => {
            setTours(tours.filter((tour) => tour._id !== id));
            Swal.fire("Deleted!", "Your tour has been deleted.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Failed to delete the tour.", "error");
          });
      } else {
        Swal.fire("Cancelled", "Your tour is safe :)", "info");
      }
    });
  };

  const handleViewPackage = (id) => {
    navigate(`/tour/${id}`);
  };

  const handleEditArea = (areaId) => {
    const areaToEdit = areas.find((area) => area._id === areaId);
    setEditingArea(areaToEdit);
    setArea(areaToEdit.area);
    setLocations(areaToEdit.locations);
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
          .delete(`https://softwareproject-server.onrender.com/api/areas/${id}`)
          .then(() => {
            setAreas(areas.filter((area) => area._id !== id));
            Swal.fire("Deleted!", "The area has been deleted.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Failed to delete the area.", "error");
          });
      }
    });
  };

  const handleRatingChange = (tourId, newRating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [tourId]: newRating,
    }));
  };

  const handleLikeToggle = (tourId, event) => {
    event.stopPropagation();

    setLikes((prevLikes) => ({
      ...prevLikes,
      [tourId]: !prevLikes[tourId],
    }));
  };

  return (
    <div className="admin-package-wrapper">
  <div className="admin-back-button">
    <Button
      variant="outlined"
      onClick={() => navigate("/admin")}
      startIcon={<ArrowBackIcon />}
    >
      Back to Dashboard
    </Button>
  </div>

  <div className="admin-package-container">
    <h1 className="admin-package-title">Available Tour Packages</h1>
    <div className="admin-package-grid">
      {tours.map((tour) => (
        <Card key={tour._id} className="admin-package-card">
          <CardMedia
            className="admin-package-media"
            component="img"
            image={tour.image}
            alt={tour.name}
          />
          <CardContent className="admin-package-content">
            <Typography variant="h5" className="admin-package-title">
              {tour.name}
            </Typography>
            
            <div className="admin-package-buttons">
              <Button
                variant="contained"
                fullWidth
                className="admin-view-btn"
                onClick={() => handleViewPackage(tour._id)}
              >
                <FontAwesomeIcon icon={faEye} className="admin-btn-icon" />
                View Package
              </Button>

              <Button
                variant="contained"
                fullWidth
                className="admin-edit-btn"
                onClick={() => handleEdit(tour._id)}
              >
                <FontAwesomeIcon icon={faEdit} className="admin-btn-icon" />
                Edit Package
              </Button>

              <Button
                variant="contained"
                fullWidth
                className="admin-delete-btn"
                onClick={() => handledelete(tour._id)}
              >
                <FontAwesomeIcon icon={faTrash} className="admin-btn-icon" />
                Delete Package
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</div>
  );
};

export default AddedPackage;
