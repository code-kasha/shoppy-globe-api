import express from "express"
import Cart from "../models/Cart.js"

const router = express.Router()

// GET /api/cart/:userId — get all cart items for a user (populated)
router.get("/:userId", async (req, res) => {
	try {
		const items = await Cart.find({ userId: req.params.userId }).populate(
			"productId",
			"name price description stockQty",
		)
		res.json(items)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// POST /api/cart — add item to cart (or update quantity if already exists)
router.post("/", async (req, res) => {
	const { userId, productId, quantity } = req.body
	try {
		const item = await Cart.findOneAndUpdate(
			{ userId, productId },
			{ $inc: { quantity: quantity ?? 1 } },
			{ new: true, upsert: true, runValidators: true },
		).populate("productId", "name price")
		res.status(201).json(item)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// PUT /api/cart/:id — set exact quantity for a cart item
router.put("/:id", async (req, res) => {
	try {
		const item = await Cart.findByIdAndUpdate(
			req.params.id,
			{ quantity: req.body.quantity },
			{ new: true, runValidators: true },
		).populate("productId", "name price")
		if (!item) return res.status(404).json({ message: "Cart item not found" })
		res.json(item)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// DELETE /api/cart/:id — remove a single item from cart
router.delete("/:id", async (req, res) => {
	try {
		const item = await Cart.findByIdAndDelete(req.params.id)
		if (!item) return res.status(404).json({ message: "Cart item not found" })
		res.json({ message: "Item removed from cart" })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// DELETE /api/cart/clear/:userId — clear entire cart for a user
router.delete("/clear/:userId", async (req, res) => {
	try {
		await Cart.deleteMany({ userId: req.params.userId })
		res.json({ message: "Cart cleared" })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

export default router
