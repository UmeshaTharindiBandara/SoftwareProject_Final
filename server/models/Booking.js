import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  area: String,
  locations: [{ name: String, image: String }],
  meals: [String],
  activities: [String],
  optionalDestinations: String,
  transportMode: String,
  hotel: String,
  specialRequests: String,
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
