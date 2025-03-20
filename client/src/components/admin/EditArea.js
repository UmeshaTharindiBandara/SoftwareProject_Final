import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import Swal from "sweetalert2";

const EditArea = () => {
  const [areaData, setAreaData] = useState({
    area: "",
    locations: [],
    image: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/areas/${id}`)
      .then((res) => {
        console.log("Fetched Area Data:", res.data); // Debugging
        setAreaData(res.data);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        Swal.fire("Error", "Failed to fetch area details", "error");
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAreaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/areas/${id}`, {
        area: areaData.area,
        locations: areaData.locations, // Ensure locations is handled correctly
        image: areaData.image,
      })
      .then(() => {
        Swal.fire("Success", "Area updated successfully", "success");
        navigate("/addedarea"); // Ensure this is the correct path
      })
      .catch((err) => {
        console.error("Update Error:", err);
        Swal.fire("Error", "Failed to update area", "error");
      });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Area
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="area"
          label="Area Name"
          value={areaData.area}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="image"
          label="Image URL"
          value={areaData.image}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Update Area
        </Button>
      </form>
    </Box>
  );
};

export default EditArea;
