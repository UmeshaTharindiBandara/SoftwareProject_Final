import React, { useState, useEffect } from "react";
import { Button, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import "./UserPackage.css";
import galleryImage from "../../assets/images/10.jpg";

const UserPackage = () => {
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedLocations, setSelectedLocations] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/areas")
            .then((res) => setAreas(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleAreaSelect = (area) => {
        setSelectedArea(area);
        setSelectedLocations([]);
    };

    const handleLocationSelect = (location) => {
        setSelectedLocations((prev) => {
            if (prev.includes(location)) {
                return prev.filter((loc) => loc !== location);
            } else {
                return [...prev, location];
            }
        });
    };

    const handleSubmit = () => {
        alert(`You have selected: ${selectedLocations.map((loc) => loc.name).join(", ")}`);
    };

    return (
        <div >
            <section className="header-image">
                  <img src={galleryImage} alt="Gallery" className="top-banner" />
                    <div className="overlay-text">
                      <h1>Customize Your Own Dream Tours </h1>
                      <p>Discover the beauty, culture, and adventures of Sri Lanka </p>
                    </div>
                  </section> 

            {/* Area Selection */}
            <div className="area-selection">
                <Typography variant="h5" className="section-title">
                    <MdOutlineLocationOn className="icon" /> <b>Select an Area to Explore</b>
                </Typography>
                <br/>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="area-buttons"
                >
                    {areas.map((area, index) => (
                        <Button
                        key={index}
                        variant="contained"
                        onClick={() => handleAreaSelect(area)}
                        className={`area-button ${selectedArea === area ? "area-button-selected" : ""}`}
                    >
                        {/* Adding icon and name to the button */}
                        <MdOutlineLocationOn className="icon" />
                        <span className="area-name">{area.area}</span>
                    </Button>
                    
                    
                    ))}
                </motion.div>
            </div>
            <br/>

            {/* Location Selection */}
            {selectedArea && (
                <div>
                    <Typography variant="h5" className="section-title">
                        Choose Locations in {selectedArea.area}
                    </Typography>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="location-grid"
                    >
                        {selectedArea.locations.map((location, index) => (
                            <Card
                                key={index}
                                onClick={() => handleLocationSelect(location)}
                                className={`location-card ${
                                    selectedLocations.includes(location)
                                        ? "location-card-selected"
                                        : ""
                                }`}
                            >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={location.image}
                                    alt={location.name}
                                    className="location-image"
                                />
                                <CardContent className="location-content">
                                    <Typography
                                        variant="subtitle1"
                                        className={`location-title ${
                                            selectedLocations.includes(location)
                                                ? "location-title-selected"
                                                : ""
                                        }`}
                                    >
                                        {location.name}
                                    </Typography>
                                    {selectedLocations.includes(location) && (
                                        <FaCheckCircle className="selected-icon" />
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </div>
            )}

            {/* Submit Button */}
            {selectedLocations.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="submit-section"
                >
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        className="submit-button"
                    >
                        Further customize my own tour 
                        
                    </Button>
                    
                </motion.div>
               
                
            )}
            <br/><br/><br/>
        </div>
    );
};

export default UserPackage;
