import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydatabase"

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// routes
app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/api/info", (req, res) => {
  res.json({ message: "This is some sample data from the server." })
})

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() })
})

// start server
app.listen(PORT, async () => {
  try {
    console.log(`App is running on port : ${PORT}`)
    await mongoose.connect(MONGO_URI)
    console.log("Connected to MongoDB successfully")
  } catch (error) {
    console.error("MongoDB connection failed:", error.message)
  }
})

export default app
