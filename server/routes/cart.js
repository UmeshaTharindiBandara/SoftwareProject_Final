import express from 'express';
import Cart from '../models/cart.js';

const router = express.Router();

// Add to cart
router.post('/add', async (req, res) => {
  try {
    const { userId, packageDetails } = req.body;

    const newCartItem = new Cart({
      userId,
      packageDetails
    });

    await newCartItem.save();

    res.json({
      success: true,
      message: 'Added to cart successfully'
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add to cart',
      error: error.message
    });
  }
});

// Get cart items by user ID
router.get('/:userId', async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId });
    res.json(cartItems);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart items',
      error: error.message
    });
  }
});

// Remove from cart
router.delete('/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: error.message
    });
  }
});

export default router;
