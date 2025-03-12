const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL.replace(/\/$/, ""),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use("/api", router);

const server = async (req, res) => {
    await connectDB();
    return app(req, res);
};

module.exports = server; // ✅ Exporting function for Vercel
