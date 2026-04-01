import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"

dotenv.config()

const app = express()
const router = express.Router()

// Middleware
app.use("/", router)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes (uncomment as you create them)
router.use((req, res, next) => {
	console.log("Request:", req.method)
	next()
})
// import productRoutes from './routes/productRoutes.js';
// import cartRoutes from './routes/cartRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// app.use('/products', productRoutes);
// app.use('/cart', cartRoutes);
// app.use('/', authRoutes);

// MongoDB Connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("✅ MongoDB connected"))
	.catch((err) => console.error("❌ MongoDB connection error:", err))

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
