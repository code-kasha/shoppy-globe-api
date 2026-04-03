import jwt from "jsonwebtoken"
import User from "../models/User.js"

// ============================================================
// Helper function to generate JWT token
// ============================================================
const generateToken = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN, // e.g., '1d' for 1 day
	})

// ============================================================
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
// ============================================================
export const registerUser = async (req, res, next) => {
	try {
		const { username, email, password } = req.body

		// ------------------------------------------------------------
		// Validate required fields
		// ------------------------------------------------------------
		const missing = []
		if (!username) missing.push("username")
		if (!email) missing.push("email")
		if (!password) missing.push("password")
		if (missing.length > 0) {
			const err = new Error(`Missing required fields: ${missing.join(", ")}`)
			err.statusCode = 400
			return next(err)
		}

		// ------------------------------------------------------------
		// Password length check
		// ------------------------------------------------------------
		if (password.length < 8) {
			const err = new Error("Password must be at least 8 characters")
			err.statusCode = 400
			return next(err)
		}

		// ------------------------------------------------------------
		// Create user in the database
		// Password is hashed automatically in the User model
		// ------------------------------------------------------------
		const user = await User.create({ username, email, password })

		// ------------------------------------------------------------
		// Return user data and token
		// ------------------------------------------------------------
		res.status(201).json({
			success: true,
			data: {
				_id: user._id,
				username: user.username,
				email: user.email,
				token: generateToken(user._id),
			},
		})
	} catch (err) {
		next(err) // Forward to global error handler
	}
}

// ============================================================
// @desc    Authenticate user & get token (login)
// @route   POST /api/auth/login
// @access  Public
// ============================================================
export const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body

		// ------------------------------------------------------------
		// Validate required fields
		// ------------------------------------------------------------
		if (!email || !password) {
			const err = new Error("Email and password are required")
			err.statusCode = 400
			return next(err)
		}

		// ------------------------------------------------------------
		// Find user by email
		// ------------------------------------------------------------
		const user = await User.findOne({ email })
		if (!user || !(await user.matchPassword(password))) {
			const err = new Error("Invalid email or password")
			err.statusCode = 401 // Unauthorized
			return next(err)
		}

		// ------------------------------------------------------------
		// Return user data and token
		// ------------------------------------------------------------
		res.json({
			success: true,
			data: {
				_id: user._id,
				username: user.username,
				email: user.email,
				token: generateToken(user._id),
			},
		})
	} catch (err) {
		next(err)
	}
}
