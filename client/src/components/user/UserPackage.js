import React, { useState, useEffect } from "react";
import { Button, Typography, Card, CardMedia, CardContent, TextField } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import "./UserPackage.css";
import galleryImage from "../../assets/images/10.jpg";

const UserPackage = () => {
    const [areas, setAreas] = useState([]);
    const [newAreas, setNewAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [newLocations, setNewLocations] = useState([]);
    
    const [newAreaName, setNewAreaName] = useState("");
    const [newLocationName, setNewLocationName] = useState("");
    const [newLocationImage, setNewLocationImage] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/areas")
            .then((res) => setAreas(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleAreaSelect = (area) => {
        setSelectedArea(area);
        setSelectedLocations([]);
        setNewLocations([]);
    };

    const handleLocationSelect = (location) => {
        setSelectedLocations((prev) => {
            if (prev.some((loc) => loc.name === location.name)) {
                return prev.filter((loc) => loc.name !== location.name);
            } else {
                return [...prev, location];
            }
        });
    };

    const handleAddNewLocation = () => {
        if (newLocationName.trim() === "") return;
        const customLocation = {
            name: newLocationName,
            image: newLocationImage || "https://via.placeholder.com/150",
        };
        setNewLocations((prev) => [...prev, customLocation]);
        setNewLocationName("");
        setNewLocationImage(null);
    };

    const handleAddNewArea = () => {
        if (newAreaName.trim() === "") return;
        const customArea = {
            area: newAreaName,
            locations: [],
        };
        setNewAreas((prev) => [...prev, customArea]);
        setNewAreaName("");
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewLocationImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        alert(`You have selected: ${selectedLocations.map((loc) => loc.name).join(", ")}`);
    };

    return (
        <div>
            <section className="header-image">
                <img src={galleryImage} alt="Gallery" className="top-banner" />
                <div className="overlay-text">
                    <h1>Customize Your Own Dream Tour</h1>
                    <p>Discover the beauty, culture, and adventures of Sri Lanka</p>
                </div>
            </section>

            {/* Area Selection */}
            <div className="area-selection">
                <Typography variant="h5" className="section-title" style={{ marginBottom: "20px" }}>
                    <MdOutlineLocationOn className="icon" /> <b>Select an Area to Explore</b>
                </Typography>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="area-buttons"
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}  // Flexbox style
                >
                    {/* Display existing areas */}
                    {[...areas, ...newAreas].map((area, index) => (
                        <Card
                            key={index}
                            className={`area-card ${selectedArea === area ? "area-card-selected" : ""}`}
                            onClick={() => handleAreaSelect(area)}
                            style={{ cursor: 'pointer', width: '200px', height: '200px' }}
                        >
                            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <MdOutlineLocationOn className="icon" style={{ fontSize: '30px', marginBottom: '10px' }} />
                                <Typography variant="body1" style={{ textAlign: 'center' }}>
                                    {area.area}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}

                    {/* New Area Input Card */}
                    <Card className="area-card add-new-area-card" style={{ width: '200px', height: '200px' }}>
                        <CardContent>
                            <TextField
                                label="New Area Name"
                                variant="outlined"
                                value={newAreaName}
                                onChange={(e) => setNewAreaName(e.target.value)}
                                fullWidth
                            />
                            <Button
                                variant="contained"
                                onClick={handleAddNewArea}
                                className="add-area-button"
                                fullWidth
                                style={{ marginTop: '10px' }}
                            >
                                + Add New Area
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
            <br/><br/>

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
                        {[...(selectedArea.locations || []), ...newLocations].map((location, index) => (
                            <Card
                                key={index}
                                onClick={() => handleLocationSelect(location)}
                                className={`location-card ${selectedLocations.some((loc) => loc.name === location.name) ? "location-card-selected" : ""}`}
                                style={{ width: '200px', cursor: 'pointer' }}
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
                                        className={`location-title ${selectedLocations.some((loc) => loc.name === location.name) ? "location-title-selected" : ""}`}
                                    >
                                        {location.name}
                                    </Typography>
                                    {selectedLocations.some((loc) => loc.name === location.name) && (
                                        <FaCheckCircle className="selected-icon" />
                                    )}
                                </CardContent>
                            </Card>
                        ))}

                        {/* Add New Location Card */}
                        <Card className="location-card add-new-location" style={{ width: '200px' }}>
                            <CardContent className="location-content">
                                <TextField
                                    label="Enter a new location"
                                    variant="outlined"
                                    value={newLocationName}
                                    onChange={(e) => setNewLocationName(e.target.value)}
                                    className="new-location-input"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="image-upload"
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleAddNewLocation}
                                    className="add-location-button"
                                    fullWidth
                                >
                                    Add Location
                                </Button>
                            </CardContent>
                        </Card>
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
                    <Button variant="contained" onClick={handleSubmit} className="submit-button">
                        Further customize my own tour
                    </Button>
                </motion.div>
            )}
            <br/><br/>
        </div>
    );
};

export default UserPackage;
