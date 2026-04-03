import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"

// Dotenv
dotenv.config()

const app = express()
const router = express.Router()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", router)

// ✅ Sending a response — no next()
router.get("/", (req, res) => {
	res.status(200).json({ message: `Request: ${req.method}` })
})

import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import authRoutes from "./routes/authRoutes.js"

app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/auth", authRoutes)

// MongoDB Connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("✅ MongoDB connected"))
	.catch((err) => console.error("❌ MongoDB connection error:", err))

// Start Server
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
