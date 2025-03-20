// blogRoutes.js
import express from 'express';
const router = express.Router();

// Define routes here
router.get('/', (req, res) => {
  res.json('Blog Routes');
});

// Exporting the routes as default
export default router;