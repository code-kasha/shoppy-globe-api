import Product from "../models/Product.js"

// ============================================================
// Validate 'quantity' field in request body
// Ensures quantity is present and is a positive integer
// ============================================================
export const validateQuantity = (req, res, next) => {
	const { quantity } = req.body

	// ------------------------------------------------------------
	// Check if quantity is missing
	// ------------------------------------------------------------
	if (quantity === undefined || quantity === null) {
		const err = new Error("quantity is required")
		err.statusCode = 400 // Bad Request
		return next(err)
	}

	const qty = Number(quantity)

	// ------------------------------------------------------------
	// Check if quantity is a positive integer
	// ------------------------------------------------------------
	if (!Number.isInteger(qty) || qty < 1) {
		const err = new Error("quantity must be a positive integer")
		err.statusCode = 400
		return next(err)
	}

	next() // proceed if validation passes
}

// ============================================================
// Validate required product fields in request body
// Ensures 'name', 'price', and 'stockQty' are provided and valid
// ============================================================
export const validateProductBody = (req, res, next) => {
	const { name, price, stockQty } = req.body
	const missing = []

	// ------------------------------------------------------------
	// Check for missing fields
	// ------------------------------------------------------------
	if (!name || String(name).trim() === "") missing.push("name")
	if (price === undefined || price === null) missing.push("price")
	if (stockQty === undefined || stockQty === null) missing.push("stockQty")

	if (missing.length > 0) {
		const err = new Error(`Missing required fields: ${missing.join(", ")}`)
		err.statusCode = 400
		return next(err)
	}

	// ------------------------------------------------------------
	// Check that price and stockQty are non-negative numbers
	// ------------------------------------------------------------
	if (Number(price) < 0) {
		const err = new Error("price cannot be negative")
		err.statusCode = 400
		return next(err)
	}

	if (Number(stockQty) < 0) {
		const err = new Error("stockQty cannot be negative")
		err.statusCode = 400
		return next(err)
	}

	next() // all validations passed
}

// ============================================================
// Validate that a productId exists in the database
// Attaches the product to req.product if found
// ============================================================
export const validateProductExists = async (req, res, next) => {
	try {
		// ------------------------------------------------------------
		// Get productId from request body or URL params
		// ------------------------------------------------------------
		const productId = req.body.productId || req.params.productId

		if (!productId) {
			const err = new Error("productId is required")
			err.statusCode = 400
			return next(err)
		}

		// ------------------------------------------------------------
		// Check if product exists in the database
		// ------------------------------------------------------------
		const product = await Product.findById(productId)

		if (!product) {
			const err = new Error(`Product not found with ID: ${productId}`)
			err.statusCode = 404 // Not Found
			return next(err)
		}

		// ------------------------------------------------------------
		// Attach product to request for downstream use
		// ------------------------------------------------------------
		req.product = product
		next()
	} catch (err) {
		next(err) // forward unexpected errors to global error handler
	}
}
