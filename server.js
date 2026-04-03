import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

dotenv.config()

const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.get("/", (req, res) => {
	res.status(200).json({ message: `Request: ${req.method}` })
})

app.use("/", router)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/auth", authRoutes)

app.use(notFound)
app.use(errorHandler)

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("✅ MongoDB connected"))
	.catch((err) => console.error("❌ MongoDB connection error:", err))

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
