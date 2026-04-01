import express from "express"
import Product from "../models/Product.js"

const router = express.Router()

// GET /api/products — get all products
router.get("/", async (req, res) => {
	try {
		const products = await Product.find()
		res.json(products)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// GET /api/products/:id — get single product
router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		if (!product) return res.status(404).json({ message: "Product not found" })
		res.json(product)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// POST /api/products — create a product
router.post("/", async (req, res) => {
	try {
		const product = await Product.create(req.body)
		res.status(201).json(product)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// PUT /api/products/:id — update a product
router.put("/:id", async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		if (!product) return res.status(404).json({ message: "Product not found" })
		res.json(product)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// DELETE /api/products/:id — delete a product
router.delete("/:id", async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id)
		if (!product) return res.status(404).json({ message: "Product not found" })
		res.json({ message: "Product deleted" })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

export default router
