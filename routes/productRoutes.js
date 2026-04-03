import express from "express"
import {
	getAllProducts,
	getProductById,
} from "../controllers/productController.js"

const router = express.Router()

// GET all products — returns array
router.get("/", getAllProducts)

// GET single product by ID — returns single object
router.get("/:id", getProductById)

export default router
