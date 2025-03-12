const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL.replace(/\/$/, ""), // Removes trailing slash
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use("/api", router);

// Connect to DB before handling requests (optional based on your use case)
connectDB().catch(err => {
  console.error("Database connection failed:", err);
});

// Export the app for Vercel
module.exports = app;
