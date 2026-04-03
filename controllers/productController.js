import mongoose from "mongoose"
import Product from "../models/Product.js"

// ============================================================
// @desc    Get all products
// @route   GET /api/products
// @access  Public
// ============================================================
export const getAllProducts = async (req, res, next) => {
	try {
		const products = await Product.find()
		res.json({ success: true, data: products })
	} catch (err) {
		next(err) // Forward to global error handler
	}
}

// ============================================================
// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
// ============================================================
export const getProductById = async (req, res) => {
	const { id } = req.params

	// Check if the ID is a valid MongoDB ObjectId
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			success: false,
			statusCode: 400,
			message: `Invalid product ID: ${id}`,
		})
	}

	try {
		const product = await Product.findById(id)
		if (!product) {
			return res.status(404).json({
				success: false,
				statusCode: 404,
				message: "Product not found",
			})
		}

		// Return the product if found
		res.json({
			success: true,
			data: product,
		})
	} catch (err) {
		// Catch any unexpected errors
		res.status(500).json({
			success: false,
			statusCode: 500,
			message: "Unexpected server error",
		})
	}
}

// ============================================================
// @desc    Create a new product
// @route   POST /api/products
// @access  Public/Admin (depending on your auth design)
// ============================================================
export const createProduct = async (req, res, next) => {
	try {
		const product = await Product.create(req.body)
		res.status(201).json({ success: true, data: product })
	} catch (err) {
		next(err)
	}
}

// ============================================================
// @desc    Update a product by ID
// @route   PUT /api/products/:id
// @access  Public/Admin
// ============================================================
export const updateProduct = async (req, res, next) => {
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		if (!product) {
			const err = new Error("Product not found")
			err.statusCode = 404
			return next(err)
		}
		res.json({ success: true, data: product })
	} catch (err) {
		next(err)
	}
}

// ============================================================
// @desc    Delete a product by ID
// @route   DELETE /api/products/:id
// @access  Public/Admin
// ============================================================
export const deleteProduct = async (req, res, next) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id)
		if (!product) {
			const err = new Error("Product not found")
			err.statusCode = 404
			return next(err)
		}
		res.json({ success: true, message: "Product deleted" })
	} catch (err) {
		next(err)
	}
}
