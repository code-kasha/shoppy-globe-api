import Product from "../models/Product.js"

// Validate quantity field in request body
export const validateQuantity = (req, res, next) => {
	const { quantity } = req.body

	if (quantity === undefined || quantity === null) {
		const err = new Error("quantity is required")
		err.statusCode = 400
		return next(err)
	}

	const qty = Number(quantity)

	if (!Number.isInteger(qty) || qty < 1) {
		const err = new Error("quantity must be a positive integer")
		err.statusCode = 400
		return next(err)
	}

	next()
}

// Validate required product fields in request body
export const validateProductBody = (req, res, next) => {
	const { name, price, stockQty } = req.body
	const missing = []

	if (!name || String(name).trim() === "") missing.push("name")
	if (price === undefined || price === null) missing.push("price")
	if (stockQty === undefined || stockQty === null) missing.push("stockQty")

	if (missing.length > 0) {
		const err = new Error(`Missing required fields: ${missing.join(", ")}`)
		err.statusCode = 400
		return next(err)
	}

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

	next()
}

// Validate that a productId exists in the database
export const validateProductExists = async (req, res, next) => {
	try {
		const productId = req.body.productId || req.params.productId

		if (!productId) {
			const err = new Error("productId is required")
			err.statusCode = 400
			return next(err)
		}

		const product = await Product.findById(productId)

		if (!product) {
			const err = new Error(`Product not found with ID: ${productId}`)
			err.statusCode = 404
			return next(err)
		}

		req.product = product
		next()
	} catch (err) {
		next(err)
	}
}
