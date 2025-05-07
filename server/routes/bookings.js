import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// Create booking
router.post('/', async (req, res) => {
  try {
    const { userId, area, locations, meals, activities, optionalDestinations, transportMode, hotel, specialRequests } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const newBooking = new Booking({
      userId,
      area,
      locations,
      meals: Array.isArray(meals) ? meals : meals ? [meals] : [],
      activities: Array.isArray(activities) ? activities : activities ? [activities] : [],
      optionalDestinations,
      transportMode,
      hotel,
      specialRequests
    });

    await newBooking.save();
    console.log("📩 Booking saved to DB:", newBooking);
    res.status(201).json({ success: true, message: 'Booking saved successfully', booking: newBooking });
  } catch (err) {
    console.error('❌ Booking error:', err);
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

// Get bookings for user
router.get('/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .sort({ createdAt: -1 }); // Latest bookings first
    res.json(bookings);
  } catch (err) {
    console.error('Fetch bookings error:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});


// Add delete booking endpoint
router.delete('/:bookingId', async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    
    if (!deletedBooking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Booking deleted successfully',
      deletedBooking 
    });
  } catch (err) {
    console.error('Delete booking error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete booking',
      error: err.message 
    });
  }
});

export default router;