import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  packageDetails: {
    tour: {
      type: Object,
      required: true
    },
    selectedOptions: {
      type: Object,
      required: true
    },
    totalBudget: {
      type: Number,
      required: true
    },
    breakdown: {
      type: Object,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Cart', cartSchema);