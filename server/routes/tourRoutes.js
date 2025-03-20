const express = require('express');
const multer = require('multer');
const Tour = require('./models/Tour');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route for adding a new tour
router.post('/add-tour', upload.array('images'), async (req, res) => {
  const { id, name, description, price, duration } = req.body;
  const images = req.files.map(file => file.path);

  try {
    const newTour = new Tour({ id, name, description, price, duration, images });
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route for getting all tours
router.get('/add-tour', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tour details by ID
router.get('/tours/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a tour
router.put('/tours/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, duration, images } = req.body;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { name, description, price, duration, images },
      { new: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    res.status(200).json({ message: 'Tour updated successfully', tour: updatedTour });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/customize-tour', async (req, res) => {
  const {
    destinations,
    activities,
    transport,
    duration,
    hotels,
    guides,
    mealPlan,
    insurance,
    specialRequests,
    totalBudget,
  } = req.body;

  // Simple validation
  if (
    !destinations?.length ||
    !activities?.length ||
    !transport ||
    !duration ||
    !hotels ||
    !guides ||
    !mealPlan ||
    !totalBudget
  ) {
    return res.status(400).json({ error: 'All required fields must be provided' });
  }

  try {
    const tour = new Tour({
      destinations,
      activities,
      transport,
      duration,
      hotels,
      guides,
      mealPlan,
      insurance,
      specialRequests,
      totalBudget,
    });
    await tour.save();

    res.status(200).json({ message: 'Tour customized and saved successfully', data: tour });
  } catch (error) {
    console.error('Tour customization error:', error);
    res.status(500).json({ error: 'Failed to customize and save tour' });
  }
});


module.exports = router;
 