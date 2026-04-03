import mongoose from "mongoose"
import bcrypt from "bcrypt"

// ============================================================
// User Schema
// Represents a registered user in the system
// ============================================================
const userSchema = new mongoose.Schema(
	{
		// ------------------------------------------------------------
		// Username — must be unique and trimmed
		// ------------------------------------------------------------
		username: {
			type: String,
			required: [true, "Username is required"], // Validation message
			unique: true, // No duplicate usernames
			trim: true, // Remove leading/trailing spaces
			minlength: [3, "Username must be at least 3 characters"], // Minimum length
		},

		// ------------------------------------------------------------
		// Email — must be unique, valid format, lowercase
		// ------------------------------------------------------------
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			trim: true,
			lowercase: true, // Store in lowercase for consistency
			match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"], // Regex validation
		},

		// ------------------------------------------------------------
		// Password — hashed before saving, minimum length enforced
		// ------------------------------------------------------------
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 8 characters"], // Should match validation in controllers too
		},
	},
	{
		// ------------------------------------------------------------
		// Automatically add createdAt and updatedAt timestamps
		// ------------------------------------------------------------
		timestamps: true,
	},
)

// ============================================================
// Pre-save hook — hash password before saving to the database
// ============================================================
userSchema.pre("save", async function () {
	// Only hash if the password field has been modified or is new
	if (!this.isModified("password")) return

	// Generate a salt with 10 rounds
	const salt = await bcrypt.genSalt(10)

	// Hash the password using the generated salt
	this.password = await bcrypt.hash(this.password, salt)
})

// ============================================================
// Instance method — compare entered password with hashed password
// Usage: user.matchPassword(enteredPassword)
// ============================================================
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

// ------------------------------------------------------------
// Create and export the User model
// ------------------------------------------------------------
const User = mongoose.model("User", userSchema)
export default User
