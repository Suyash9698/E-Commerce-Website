const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()
app.use(cors({
    origin: "https://e-commerce-website-one-jet.vercel.app", // Removes trailing slash
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello from Express on Vercel!');
});


app.use("/api",router)



const PORT = process.env.PORT || 9001


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})

export default app;
