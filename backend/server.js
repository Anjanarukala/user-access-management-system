// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Make sure you have this
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env

const authRoutes = require("./routes/authRoutes");
const softwareRoutes = require("./routes/softwareRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true // Crucial for sending/receiving cookies (like your JWT token)
}));
app.use(express.json()); // Body parser for JSON
app.use(cookieParser()); // Parse cookies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/software", softwareRoutes); // This correctly routes /api/software to softwareRoutes.js
app.use("/api/requests", requestRoutes);

// DB connection and server start
// Removed deprecated options, they have no effect in modern Mongoose versions
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("MongoDB connection failed", err));