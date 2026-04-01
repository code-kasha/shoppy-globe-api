import express from "express"
import Cart from "../models/Cart.js"
import {
	validateProductExists,
	validateQuantity,
} from "../middleware/validationMiddleware.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// POST /api/cart — add item to cart (or update quantity if already exists)
router.post(
	"/",
	protect,
	validateProductExists,
	validateQuantity,
	async (req, res) => {
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
	},
)

// PUT /api/cart/:id — set exact quantity for a cart item
router.put("/:id", protect, validateQuantity, async (req, res) => {
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
router.delete("/:id", protect, async (req, res) => {
	try {
		const item = await Cart.findByIdAndDelete(req.params.id)
		if (!item) return res.status(404).json({ message: "Cart item not found" })
		res.json({ message: "Item removed from cart" })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

export default router
