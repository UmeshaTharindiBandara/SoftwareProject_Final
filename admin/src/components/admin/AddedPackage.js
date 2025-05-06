import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./AddPackages.css";

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
      .get("http://10.50.227.117:5000/api/tours")
      .then((res) => {
        setTours(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://10.50.227.117:5000/api/areas")
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
          .delete(`http://10.50.227.117:5000/api/tours/${id}`)
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
          .delete(`http://10.50.227.117:5000/api/areas/${id}`)
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
    <div>
      <Button
        variant="outlined"
        onClick={() => navigate("/admin")}
        className="back-button"
        startIcon={<ArrowBackIcon />}
        style={{ marginLeft: "800px" }}
      >
        Back to Dashboard
      </Button>
      <br />
      <br />

      <div className="tour-list-container">
        <h1>Available Tour Packages</h1>
        <div className="tour-grid">
          {tours.map((tour) => (
            <Card key={tour._id} className="tour-card">
              <CardMedia
                component="img"
                height="200"
                image={tour.image}
                alt={tour.name}
              />
              <CardContent>
                <Typography variant="h5" className="tour-title">
                  {tour.name}
                </Typography>

                {/* View Package Button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleViewPackage(tour._id)}
                  style={{
                    backgroundColor: "#003366",
                    color: "#ffffff",
                    marginTop: "10px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    style={{ marginRight: "8px" }}
                  />
                  View Package
                </Button>

                {/* Edit Package Button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleEdit(tour._id)}
                  style={{
                    backgroundColor: "#28a745",
                    color: "#ffffff",
                    marginTop: "10px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ marginRight: "8px" }}
                  />
                  Edit Package
                </Button>

                {/* Delete Package Button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handledelete(tour._id)}
                  style={{
                    backgroundColor: "red",
                    color: "#ffffff",
                    marginTop: "10px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ marginRight: "8px" }}
                  />
                  Delete Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddedPackage;
