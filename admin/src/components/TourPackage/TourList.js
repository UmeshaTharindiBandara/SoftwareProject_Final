import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, IconButton, Rating, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TourList.css";

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [ratings, setRatings] = useState({});
  const [likes, setLikes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tours")
      .then((res) => {
        setTours(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleViewPackage = (id) => {
    navigate(`/tour/${id}`);
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
    <div className="tour-list-container">
      <h1>Explore Our Amazing Tour Packages</h1>
      <div className="tour-grid">
        {tours.map((tour) => (
          <Card key={tour._id} className="tour-card">
            <CardMedia component="img" height="200" image={tour.image} alt={tour.name} />
            <CardContent>
              <Typography variant="h5" className="tour-title">{tour.name}</Typography>
              <Typography variant="body2" color="text.secondary" className="tour-description">
                {tour.description}
              </Typography>

              {/* Rating and Like Section - Uniform Layout */}
              <Box className="tour-footer">
                <div className="rating-section">
                  <Rating
                    value={ratings[tour._id] || 0}
                    precision={0.5}
                    onChange={(event, newValue) => handleRatingChange(tour._id, newValue)}
                  />
                  <span>{ratings[tour._id] ? `${ratings[tour._id]} Stars` : "No Rating"}</span>
                </div>

                <IconButton
  className="like-button"
  onClick={(e) => handleLikeToggle(tour._id, e)}
>
  <FontAwesomeIcon
    icon={faHeart}
    className={likes[tour._id] ? "heart-icon liked" : "heart-icon"}
  />
</IconButton>

              </Box>

              {/* View Package Button */}
              <button className="view-package-btn" onClick={() => handleViewPackage(tour._id)}>
                View Package
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TourList;
