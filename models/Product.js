import mongoose from "mongoose"

// ============================================================
// Product Schema
// Represents products available in the store
// ============================================================
const productSchema = new mongoose.Schema(
	{
		// ------------------------------------------------------------
		// Name of the product
		// ------------------------------------------------------------
		name: {
			type: String,
			required: [true, "Product name is required"], // Validation
			trim: true, // Remove leading/trailing spaces
		},

		// ------------------------------------------------------------
		// Price of the product
		// ------------------------------------------------------------
		price: {
			type: Number,
			required: [true, "Price is required"],
			min: [0, "Price cannot be negative"], // No negative prices
		},

		// ------------------------------------------------------------
		// Optional description of the product
		// ------------------------------------------------------------
		description: {
			type: String,
			trim: true,
			default: "", // Default to empty string
		},

		// ------------------------------------------------------------
		// Quantity available in stock
		// ------------------------------------------------------------
		stockQty: {
			type: Number,
			required: [true, "Stock quantity is required"],
			min: [0, "Stock quantity cannot be negative"], // No negative stock
			default: 0, // Default to 0 if not specified
		},
	},
	{
		// ------------------------------------------------------------
		// Automatically add createdAt and updatedAt timestamps
		// ------------------------------------------------------------
		timestamps: true,
	},
)

// ------------------------------------------------------------
// Create and export the Product model
// ------------------------------------------------------------
const Product = mongoose.model("Product", productSchema)
export default Product
