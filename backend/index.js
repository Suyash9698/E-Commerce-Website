const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json())
app.use(cookieParser())

// Database Connection (ensure it connects only once)
connectDB()
  .then(() => console.log("✅ Connected to Database"))
  .catch(err => console.error("❌ Database Connection Error:", err));

app.get('/', (req, res) => {
    console.log("Received request on /")
    res.send('Hello from Express on Vercel!');
});

// Use API routes
app.use("/api", router);

// Export the app for Vercel
module.exports = app; // Use module.exports for Vercel
