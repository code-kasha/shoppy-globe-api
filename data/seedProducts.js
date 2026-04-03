import "dotenv/config" // Load environment variables from .env

import mongoose from "mongoose"
import Product from "../models/Product.js"

// ------------------------------------------------------------
// 1️⃣ Ensure MONGO_URI is defined in .env
// ------------------------------------------------------------
const MONGO_URI = process.env.MONGO_URI
if (!MONGO_URI) throw new Error("MONGO_URI is not defined in your .env file")

// ------------------------------------------------------------
// 2️⃣ Sample product data to seed into the database
// ------------------------------------------------------------
const sampleProducts = [
	{
		name: "Wireless Headphones",
		price: 79.99,
		description: "Over-ear noise-cancelling headphones with 30hr battery life.",
		stockQty: 120,
	},
	{
		name: "Mechanical Keyboard",
		price: 129.99,
		description: "TKL mechanical keyboard with Cherry MX Brown switches.",
		stockQty: 75,
	},
	{
		name: "USB-C Hub",
		price: 39.99,
		description: "7-in-1 USB-C hub with HDMI, SD card reader, and PD charging.",
		stockQty: 200,
	},
	{
		name: "Webcam 1080p",
		price: 59.99,
		description: "Full HD webcam with built-in microphone and auto-focus.",
		stockQty: 95,
	},
	{
		name: "Laptop Stand",
		price: 24.99,
		description:
			'Adjustable aluminium laptop stand, compatible with 10–17" laptops.',
		stockQty: 300,
	},
]

// ============================================================
// 3️⃣ Seed function
// Connects to MongoDB, clears existing products, inserts sample data
// ============================================================
const seed = async () => {
	try {
		// ------------------------------------------------------------
		// Connect to MongoDB
		// ------------------------------------------------------------
		await mongoose.connect(MONGO_URI)
		console.log("✅ Connected to MongoDB")

		// ------------------------------------------------------------
		// Remove all existing products to avoid duplicates
		// ------------------------------------------------------------
		await Product.deleteMany()
		console.log("✅ Cleared existing products")

		// ------------------------------------------------------------
		// Insert sample products into database
		// ------------------------------------------------------------
		const inserted = await Product.insertMany(sampleProducts)
		console.log(`✅ Seeded ${inserted.length} products:`)
		inserted.forEach((p) => console.log(`  • ${p.name} — $${p.price}`))
	} catch (err) {
		// ------------------------------------------------------------
		// Log any errors during connection or insertion
		// ------------------------------------------------------------
		console.error("❌ Seeding failed:", err.message)
	} finally {
		// ------------------------------------------------------------
		// Disconnect from MongoDB regardless of success/failure
		// ------------------------------------------------------------
		await mongoose.disconnect()
		console.log("✅ Disconnected from MongoDB")
	}
}

// ------------------------------------------------------------
// Run the seed function
// ------------------------------------------------------------
seed()
