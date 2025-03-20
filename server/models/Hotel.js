import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  areaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
  locationName: { type: String, required: true }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;  // Default export
