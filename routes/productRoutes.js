import express from "express"
import Product from "../models/Product.js"
import { validateProductBody } from "../middleware/validationMiddleware.js"

const router = express.Router()

// GET /api/products — get all products
router.get("/", validateProductBody, async (req, res) => {
	try {
		const products = await Product.find()
		res.json(products)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// GET /api/products/:id — get single product
router.get("/:id", validateProductBody, async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		if (!product) return res.status(404).json({ message: "Product not found" })
		res.json(product)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

export default router
