import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { Server } from 'socket.io';
import http from 'http';

import profileRoutes from './routes/profileRoutes.js';
import areaRoutes from "./routes/areaRoutes.js";
import ChatMessage from './models/ChatMessage.js';
import blogRoutes from './models/BlogPost.js';

import adminModel from "./models/admin.js";
import userModel from "./models/user.js";

import hotelRoutes from "./routes/hotelRoutes.js";

import Stripe from "stripe";

import bookingRoutes from './routes/bookings.js';

// Load environment variables
config();

const app = express();
/** App middlewares */
app.use(morgan('tiny'));
app.use(cors({
  origin: ["https://mahawelitours.onrender.com", "https://softwareproject-final.onrender.com"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));
app.use("/api/areas", areaRoutes);
app.use('/api/blogs', blogRoutes);

app.use('/api', profileRoutes);
app.use('/api', hotelRoutes);

app.use('/api/bookings', bookingRoutes);

const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // Required for newer SDK versions
});

// Debugging: Confirm key is loaded
console.log(
  "[STRIPE] Key Status:",
  process.env.STRIPE_SECRET_KEY ? "✅ Loaded" : "❌ Missing"
);


/** Nodemailer setup */
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true, // Logs debugging information
  logger: true, // Logs SMTP communication
});
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'https://mahawelitours.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

/** Home route */
app.get('/', (req, res) => {
  res.json("Server is running");
});

//user signup
app.post("/api/user_signup", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      userModel
        .create({ name, email, password: hash })
        .then((user) => res.json("success"))
        .catch((err) =>
          res.status(500).json({ error: "Database error", details: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ error: "Encryption error", details: err })
    );
});

// user login
// Replace the existing login endpoint with this:
app.post("/api/user_login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ status: "error", message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: "error", message: "Invalid password" });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "jwt-secret-key",
      { expiresIn: "24h" }
    );

    // Remove password from user object
    const userToSend = user.toObject();
    delete userToSend.password;

    res.json({
      status: "success",
      token,
      user: userToSend
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// Add authentication middleware
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwt-secret-key");
    const user = await userModel.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// admin signup
app.post("/api/admin_signup", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      adminModel
        .create({ name, email, password: hash })
        .then((admin) => res.json("success"))
        .catch((err) =>
          res.status(500).json({ error: "Database error", details: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ error: "Encryption error", details: err })
    );
});

// admin login
app.post("/api/admin_login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(400).json({ 
        status: "error", 
        message: "Admin not found" 
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ 
        status: "error", 
        message: "Invalid password" 
      });
    }

    // Create token
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET || "jwt-secret-key",
      { expiresIn: "24h" }
    );

    // Remove password from admin object
    const adminToSend = admin.toObject();
    delete adminToSend.password;

    res.json({
      status: "success",
      token,
      admin: adminToSend
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

const tourSchema = new mongoose.Schema({
  name: String,
  description: String,
  budget: Number,
  duration: String,
  highlights: [String],
  image: String,
  categories: {
    meals: [String],
    activities: [String],
    optionalDestinations: [String],
    transportModes: [String],
    guides: [String],
    hotels: [String],
  },
  budgets: {
    mealBudgets: [Number],
    activityBudgets: [Number],
    optionalDestinationBudgets: [Number],
    transportModeBudgets: [Number],
    guideBudgets: [Number],
    hotelBudgets: [Number],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

// **Create a new tour package**
app.post("/api/tours", async (req, res) => {
  try {
    const {
      name,
      description,
      budget,
      duration,
      highlights,
      image,
      categories, // Expecting an object
      budgets, // Expecting an object
    } = req.body;

    if (!categories || !budgets) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const newTour = new Tour({
      name,
      description,
      budget,
      duration,
      highlights,
      image,
      categories: {
        meals: categories.meals || [],
        activities: categories.activities || [],
        optionalDestinations: categories.optionalDestinations || [],
        transportModes: categories.transportModes || [],
        guides: categories.guides || [],
        hotels: categories.hotels || [],
      },
      budgets: {
        mealBudgets: budgets.mealBudgets || [],
        activityBudgets: budgets.activityBudgets || [],
        optionalDestinationBudgets: budgets.optionalDestinationBudgets || [],
        transportModeBudgets: budgets.transportModeBudgets || [],
        guideBudgets: budgets.guideBudgets || [],
        hotelBudgets: budgets.hotelBudgets || [],
      },
    });

    await newTour.save();
    res.status(201).json({ success: true, message: "Tour package added successfully!", data: newTour });
  } catch (error) {
    console.error("Error adding tour:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});


// **Fetch all tour packages**
app.get("/api/tours", async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({ success: true, data: tours });
  } catch (error) {
    console.error("Error fetching tours:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// **Fetch a single tour package**
app.get("/api/tours/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ success: false, message: "Tour not found" });
    res.status(200).json({ success: true, data: tour });
  } catch (error) {
    console.error("Error fetching tour:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// **Update a tour package**
app.put("/api/tours/:id", async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTour) return res.status(404).json({ success: false, message: "Tour not found" });
    res.status(200).json({ success: true, data: updatedTour });
  } catch (error) {
    console.error("Error updating tour:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// **Delete a tour package**
app.delete("/api/tours/:id", async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if (!deletedTour) return res.status(404).json({ success: false, message: "Tour not found" });
    res.status(200).json({ success: true, message: "Tour deleted successfully." });
  } catch (error) {
    console.error("Error deleting tour:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// Chat Message Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { user, message } = req.body;
    if (!user || !message) {
      return res.status(400).json({ error: 'User and message are required' });
    }

    const chatMessage = new ChatMessage({ user, message });
    await chatMessage.save();
    res.status(201).json(chatMessage);
  } catch (error) {
    console.error('Error saving chat message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/chat', async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Payments
app.post("/api/checkout", async (req, res) => {
  try {
    const { totalBudget } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Customized Tour Package" },
            unit_amount: Math.round(totalBudget * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `https://mahawelitours.onrender.com/success`,
      cancel_url: `https://mahawelitours.onrender.com/cancel`,
    });

    res.json({ id: session.id });
  } catch (e) {
    console.error("Stripe Error:", e);
    res.status(500).json({ error: e.message });
  }
});

// Socket.io Setup
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('chat message', async (data) => {
    try {
      const chatMessage = new ChatMessage(data);
      await chatMessage.save();

      io.emit('chat message', chatMessage);
      socket.emit('message status', 'Message Sent Successfully');
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});


// Start the server
const PORT = 5000;
/** MongoDB Connection */
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


/** Start the server */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
