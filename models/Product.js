import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Product name is required"],
			trim: true,
		},
		price: {
			type: Number,
			required: [true, "Price is required"],
			min: [0, "Price cannot be negative"],
		},
		description: {
			type: String,
			trim: true,
			default: "",
		},
		stockQty: {
			type: Number,
			required: [true, "Stock quantity is required"],
			min: [0, "Stock quantity cannot be negative"],
			default: 0,
		},
	},
	{
		timestamps: true,
	},
)

const Product = mongoose.model("Product", productSchema)

export default Product
