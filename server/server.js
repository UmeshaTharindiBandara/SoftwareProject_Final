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

import newuserModel from "./models/user.js";
import hotelRoutes from "./routes/hotelRoutes.js";

import Stripe from "stripe";

// Load environment variables
config();

const app = express();


const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // Required for newer SDK versions
});

// Debugging: Confirm key is loaded
console.log(
  "[STRIPE] Key Status:",
  process.env.STRIPE_SECRET_KEY ? "✅ Loaded" : "❌ Missing"
);




/** App middlewares */
app.use(morgan('tiny'));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));
app.use("/api/areas", areaRoutes);
app.use('/api/blogs', blogRoutes);


/** MongoDB Connection */
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

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
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

/** Home route */
app.get('/', (req, res) => {
  res.json("Server is running");
});


//signup

app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      newuserModel
        .create({ name, email, password: hash })
        .then((user) => res.json("success"))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

//login

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  newuserModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign(
              { email: user.email, role: user.role },
              "jwt-secret-key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json({ status: "success", role: user.role });
          } else {
            return res.json("wrong password");
          }
        });
      } else {
        return res.json("no record");
      }
    })
    .catch((err) => {
      return res.json("error occurred");
    });
});

const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  duration: { type: String, required: true },
  highlights: { type: [String], required: true },
  image: { type: String, required: true },
  meals: { type: [String], default: [] },
  activities: { type: [String], default: [] },
  optionalDestinations: { type: [String], default: [] },
  transportModes: { type: [String], default: [] },
  guides: { type: [String], default: [] },
  hotels: { type: [String], default: [] },
});

const Tour = mongoose.model("Tour", tourSchema);

// Create a new tour package
app.post("/api/tours", async (req, res) => {
  const { name, description, budget, duration, highlights, image, meals, activities, optionalDestinations, transportModes, guides, hotels } = req.body;

  if (!name || !description || budget === undefined || !duration || !highlights || !image) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  try {
    const newTour = new Tour({
      name,
      description,
      budget,
      duration,
      highlights,
      image,
      meals,
      activities,
      optionalDestinations,
      transportModes,
      guides,
      hotels,
    });

    await newTour.save();
    res.status(201).json({ success: true, data: newTour });
  } catch (error) {
    console.error("Error creating tour:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// Get all tour packages
app.get("/api/tours", async (req, res) => {
  try {
    const tours = await Tour.find({});
    res.status(200).json({ success: true, data: tours });
  } catch (error) {
    console.error("Error fetching tours:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// Get a single tour package by ID
app.get("/api/tours/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({ success: false, message: "Tour not found." });
    }
    res.status(200).json({ success: true, data: tour });
  } catch (error) {
    console.error("Error fetching tour:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// Update a tour package
app.put("/api/tours/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, budget, duration, highlights, image, meals, activities, optionalDestinations, transportModes, guides, hotels } = req.body;

  if (!name || !description || budget === undefined || !duration || !highlights || !image) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { name, description, budget, duration, highlights, image, meals, activities, optionalDestinations, transportModes, guides, hotels },
      { new: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ success: false, message: "Tour not found." });
    }

    res.status(200).json({ success: true, data: updatedTour });
  } catch (error) {
    console.error("Error updating tour:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// Delete a tour package
app.delete("/api/tours/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return res.status(404).json({ success: false, message: "Tour not found." });
    }

    res.status(200).json({ success: true, message: "Tour deleted successfully." });
  } catch (error) {
    console.error("Error deleting tour:", error.message);
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
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
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

mongoose
  .connect("mongodb://localhost:27017/tourDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB.");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });


app.use('/api', profileRoutes);
app.use('/api', hotelRoutes);


/** Start the server */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
