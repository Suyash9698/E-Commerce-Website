const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL.replace(/\/$/, ""), // Removes trailing slash
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())
app.use("/api",router)

// const PORT = process.env.PORT || 8080
const PORT = 8001


connectDB().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`✅ Server is running on port ${PORT}`);
    });
});
