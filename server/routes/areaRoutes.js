import express from "express";
import Area from "../models/Area.js";

const router = express.Router();

// Add a new area with locations including image URLs
router.post("/", async (req, res) => {
  const { area, locations } = req.body;

  // Validation
  if (!area || !locations.length) {
    return res.status(400).json({ error: "Area and locations are required" });
  }

  try {
    const newArea = new Area({ area, locations });
    await newArea.save();
    res.status(201).json({ message: "Area added successfully!", area: newArea });
  } catch (error) {
    res.status(500).json({ error: "Failed to add area", details: error.message });
  }
});

// Get all areas
router.get("/", async (req, res) => {
  try {
    const areas = await Area.find();
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ error: "Error fetching areas", details: error.message });
  }
});

// Delete an area by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedArea = await Area.findByIdAndDelete(req.params.id);
    if (!deletedArea) {
      return res.status(404).json({ error: "Area not found" });
    }
    res.status(200).json({ message: "Area deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting area", details: error.message });
  }
});

// Get area by ID
router.get("/:id", async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) {
      return res.status(404).json({ message: "Area not found" });
    }
    res.json(area);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update area by ID
router.put("/areas/:id", async (req, res) => {
  try {
    const { area, locations } = req.body;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid area ID" });
    }

    // Validate the input data
    if (!area || !Array.isArray(locations) || locations.length === 0) {
      return res.status(400).json({ message: "Area and locations data are required and must be valid." });
    }

    // Check for schema match if locations have specific fields
    for (const loc of locations) {
      if (!loc.name || !loc.image) {
        return res.status(400).json({ message: "Each location must have a 'name' and 'image'." });
      }
    }

    // Update the area with error handling
    const updatedArea = await Area.findByIdAndUpdate(
      req.params.id,
      { area, locations },
      { new: true, runValidators: true }
    );

    // If no area is found with the provided ID
    if (!updatedArea) {
      return res.status(404).json({ message: "Area not found" });
    }

    res.status(200).json(updatedArea);
  } catch (error) {
    console.error("Error updating area:", error.message);
    res.status(500).json({ 
      message: "An internal server error occurred", 
      error: error.message 
    });
  }
});

export default router;
