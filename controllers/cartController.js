import Cart from "../models/Cart.js"

// ============================================================
// @desc    Add item to cart or increment quantity if it exists
// @route   POST /api/cart
// @access  Private
// ============================================================
export const addToCart = async (req, res, next) => {
	try {
		const { userId, productId, quantity } = req.body

		// Use findOneAndUpdate with upsert to create if not exists
		const item = await Cart.findOneAndUpdate(
			{ userId, productId },
			{ $inc: { quantity: quantity ?? 1 } }, // Increment quantity by requested amount
			{ new: true, upsert: true, runValidators: true }, // Return updated doc & validate
		).populate("productId", "name price") // Populate product info

		res.status(201).json({ success: true, data: item })
	} catch (err) {
		next(err) // Forward to global error handler
	}
}

// ============================================================
// @desc    Update exact quantity of a cart item
// @route   PUT /api/cart/:id
// @access  Private
// ============================================================
export const updateCartItem = async (req, res, next) => {
	try {
		const item = await Cart.findByIdAndUpdate(
			req.params.id,
			{ quantity: req.body.quantity },
			{ new: true, runValidators: true },
		).populate("productId", "name price")

		if (!item) {
			const err = new Error("Cart item not found")
			err.statusCode = 404
			return next(err)
		}

		res.json({ success: true, data: item })
	} catch (err) {
		next(err)
	}
}

// ============================================================
// @desc    Remove a single item from cart
// @route   DELETE /api/cart/:id
// @access  Private
// ============================================================
export const removeCartItem = async (req, res, next) => {
	try {
		const item = await Cart.findByIdAndDelete(req.params.id)

		if (!item) {
			const err = new Error("Cart item not found")
			err.statusCode = 404
			return next(err)
		}

		res.json({ success: true, message: "Item removed from cart" })
	} catch (err) {
		next(err)
	}
}
