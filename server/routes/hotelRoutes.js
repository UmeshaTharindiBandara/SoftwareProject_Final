import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

/**
 * Add a new hotel
 */
router.post("/addhotel", async (req, res) => {
  try {
    const { name, image, price, rating, areaId, locationName } = req.body;

    if (!name || !image || !price || !rating || !areaId || !locationName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newHotel = new Hotel({ name, image, price, rating, areaId, locationName });
    await newHotel.save();

    res.status(201).json({ message: "Hotel added successfully!", hotel: newHotel });
  } catch (error) {
    console.error("Error adding hotel:", error);
    res.status(500).json({ message: "Error adding hotel", error: error.message });
  }
});

/**
 *  Get hotels by areaId (Optional Query)
 */
router.get("/hotels", async (req, res) => {
  try {
    const { areaId } = req.query;
    const filter = areaId ? { areaId } : {}; // If areaId is provided, filter by it

    const hotels = await Hotel.find(filter).populate("areaId");

    if (!hotels.length) {
      return res.status(404).json({ message: "No hotels found" });
    }

    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ message: "Error fetching hotels", error: error.message });
  }
});

/**
 *  Get a single hotel by ID
 */
router.get("/hotels/:hotelId", async (req, res) => {
  try {
    const { hotelId } = req.params;
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({ message: "Error fetching hotel", error: error.message });
  }
});

/**
 *  Update a hotel (Only Update Provided Fields)
 */

router.put("/hotels/:hotelId", async (req, res) => {
  try {
    const { hotelId } = req.params;
    const updateFields = req.body; // Directly using the request body

    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ message: "Hotel updated successfully", hotel: updatedHotel });
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ message: "Error updating hotel", error: error.message });
  }
});


/**
 *  Delete a hotel
 */
router.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const { hotelId } = req.params;
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    res.status(500).json({ message: "Error deleting hotel", error: error.message });
  }
});

export default router;
