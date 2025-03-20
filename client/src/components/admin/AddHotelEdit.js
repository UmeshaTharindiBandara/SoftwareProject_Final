import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent 
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HotelIcon from "@mui/icons-material/Hotel";

const EditHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState({
    name: "",
    price: "",
    rating: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/hotels/${id}`)
      .then((res) => {
        setHotel(res.data); // Ensure res.data is correctly structured
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to fetch hotel details", "error");
      });
  }, [id]);

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      await axios.put(`http://localhost:5000/api/hotels/${id}`, hotel);
      Swal.fire("Updated!", "Hotel details updated!", "success");
      navigate("/addedhotel"); // Navigate only after a successful update
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update hotel details", "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <HotelIcon fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="h5">Edit Hotel Details</Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Hotel Name"
              name="name"
              value={hotel.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Price"
              name="price"
              value={hotel.price}
              onChange={handleChange}
              fullWidth
              required
              type="number"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Rating"
              name="rating"
              value={hotel.rating}
              onChange={handleChange}
              fullWidth
              required
              type="number"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Image URL"
              name="image"
              value={hotel.image}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" type="submit">
                Update Hotel
              </Button>

              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/addedhotel")}
              >
                Back to List
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditHotel;
