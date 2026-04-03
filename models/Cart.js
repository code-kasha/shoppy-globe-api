import mongoose from "mongoose"

// ============================================================
// Cart Schema
// Represents items a user has added to their shopping cart
// ============================================================
const cartSchema = new mongoose.Schema(
	{
		// ------------------------------------------------------------
		// Reference to the User who owns this cart item
		// ------------------------------------------------------------
		userId: {
			type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
			ref: "User", // References the 'User' collection
			required: [true, "User ID is required"], // Validation message
		},

		// ------------------------------------------------------------
		// Reference to the Product added to the cart
		// ------------------------------------------------------------
		productId: {
			type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
			ref: "Product", // References the 'Product' collection
			required: [true, "Product ID is required"],
		},

		// ------------------------------------------------------------
		// Quantity of this product in the cart
		// ------------------------------------------------------------
		quantity: {
			type: Number,
			required: [true, "Quantity is required"],
			min: [1, "Quantity must be at least 1"], // Minimum allowed value
			default: 1, // Default quantity if not specified
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
// Prevent the same product from being added multiple times by the same user
// Creates a unique index on { userId, productId }
// ------------------------------------------------------------
cartSchema.index({ userId: 1, productId: 1 }, { unique: true })

// ------------------------------------------------------------
// Create and export the Cart model
// ------------------------------------------------------------
const Cart = mongoose.model("Cart", cartSchema)
export default Cart
