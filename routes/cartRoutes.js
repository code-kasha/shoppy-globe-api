import express from "express"
import {
	addToCart,
	updateCartItem,
	removeCartItem,
} from "../controllers/cartController.js"
import {
	validateProductExists,
	validateQuantity,
} from "../middleware/validationMiddleware.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// ------------------------------------------------------------
// Add item to cart (or increment quantity if already exists)
// Protected route, validate product existence & quantity
// ------------------------------------------------------------
router.post("/", protect, validateProductExists, validateQuantity, addToCart)

// ------------------------------------------------------------
// Update exact quantity of a cart item
// Protected route, validate quantity
// ------------------------------------------------------------
router.put("/:id", protect, validateQuantity, updateCartItem)

// ------------------------------------------------------------
// Remove a single item from cart
// Protected route
// ------------------------------------------------------------
router.delete("/:id", protect, removeCartItem)

export default router
