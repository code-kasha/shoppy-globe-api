import "dotenv/config"

import mongoose from "mongoose"
import Cart from "../models/Cart.js"
import User from "../models/User.js"
import Product from "../models/Product.js"

// ------------------------------------------------------------
// 1️⃣ Ensure MONGO_URI is defined in .env
// ------------------------------------------------------------
const MONGO_URI = process.env.MONGO_URI
if (!MONGO_URI) throw new Error("MONGO_URI is not defined in your .env file")

// ============================================================
// 2️⃣ Seed function
// Connects to MongoDB, fetches existing users & products,
// clears existing cart items, then inserts sample cart data
// ============================================================
const seed = async () => {
	try {
		// ------------------------------------------------------------
		// Connect to MongoDB
		// ------------------------------------------------------------
		await mongoose.connect(MONGO_URI)
		console.log("✅ Connected to MongoDB")

		// ------------------------------------------------------------
		// Fetch existing users and products from the database
		// We need real ObjectIds — never hardcode them
		// ------------------------------------------------------------
		const users = await User.find().select("_id").lean()
		const products = await Product.find().select("_id name price").lean()

		if (users.length === 0) throw new Error("No users found — seed users first")
		if (products.length === 0)
			throw new Error("No products found — run seedProducts first")

		// ------------------------------------------------------------
		// Build sample cart items
		// Distribute products across available users
		// ------------------------------------------------------------
		const sampleCartItems = [
			{ userId: users[0]._id, productId: products[0]._id, quantity: 1 },
			{ userId: users[0]._id, productId: products[1]._id, quantity: 2 },
			{ userId: users[0]._id, productId: products[2]._id, quantity: 1 },
		]

		// Add more users' carts if they exist
		if (users[1]) {
			sampleCartItems.push(
				{ userId: users[1]._id, productId: products[0]._id, quantity: 3 },
				{
					userId: users[1]._id,
					productId: products[3 % products.length]._id,
					quantity: 1,
				},
			)
		}

		if (users[2]) {
			sampleCartItems.push(
				{ userId: users[2]._id, productId: products[1]._id, quantity: 1 },
				{
					userId: users[2]._id,
					productId: products[4 % products.length]._id,
					quantity: 2,
				},
			)
		}

		// ------------------------------------------------------------
		// Remove all existing cart items to avoid duplicate key errors
		// ------------------------------------------------------------
		await Cart.deleteMany()
		console.log("✅ Cleared existing cart items")

		// ------------------------------------------------------------
		// Insert sample cart items into database
		// ------------------------------------------------------------
		const inserted = await Cart.insertMany(sampleCartItems)
		console.log(`✅ Seeded ${inserted.length} cart items:`)

		// Log each item with populated product name for readability
		for (const item of inserted) {
			const product = products.find((p) => p._id.equals(item.productId))
			const user = users.find((u) => u._id.equals(item.userId))
			console.log(
				`  • User ${user._id} — ${product.name} ($${product.price}) × ${item.quantity}`,
			)
		}
	} catch (err) {
		console.error("❌ Seeding failed:", err.message)
	} finally {
		await mongoose.disconnect()
		console.log("✅ Disconnected from MongoDB")
	}
}

// ------------------------------------------------------------
// Run the seed function
// ------------------------------------------------------------
seed()
