
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  destinations: {
    type: [String], 
    required: true,
  },
  activities: {
    type: [String], 
    required: true,
  },
  transport: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  hotels: {
    type: String,
    required: true,
  },
  guides: {
    type: String,
    required: true,
  },
  mealPlan: {
    type: String,
    required: true,
  },
  insurance: {
    type: Boolean,
    default: false,
  },
  specialRequests: {
    type: String,
    default: '',
  },
  totalBudget: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Tour', tourSchema);
