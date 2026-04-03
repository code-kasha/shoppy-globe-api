import jwt from "jsonwebtoken"
import User from "../models/User.js"

// ============================================================
// Middleware to protect routes — requires a valid JWT token
// ============================================================
export const protect = async (req, res, next) => {
	try {
		// ------------------------------------------------------------
		// 1️⃣ Get Authorization header
		// Format expected: 'Bearer <token>'
		// ------------------------------------------------------------
		const authHeader = req.headers.authorization

		// ------------------------------------------------------------
		// 2️⃣ Check if token exists and is in the correct format
		// If missing or malformed, return 401 JSON
		// ------------------------------------------------------------
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({
				success: false,
				statusCode: 401,
				message: "Not authorized — no token provided",
			})
		}

		// ------------------------------------------------------------
		// 3️⃣ Extract the token string (remove 'Bearer ' prefix)
		// ------------------------------------------------------------
		const token = authHeader.split(" ")[1]

		let decoded
		try {
			// ------------------------------------------------------------
			// 4️⃣ Verify the token using JWT secret
			// If verification fails (invalid or expired), respond 401 JSON
			// ------------------------------------------------------------
			decoded = jwt.verify(token, process.env.JWT_SECRET)
		} catch {
			return res.status(401).json({
				success: false,
				statusCode: 401,
				message: "Not authorized — token is invalid or expired",
			})
		}

		// ------------------------------------------------------------
		// 5️⃣ Fetch the user from the database using decoded token ID
		// Exclude password for security
		// ------------------------------------------------------------
		const user = await User.findById(decoded.id).select("-password")
		if (!user) {
			return res.status(401).json({
				success: false,
				statusCode: 401,
				message: "Not authorized — user no longer exists",
			})
		}

		// ------------------------------------------------------------
		// 6️⃣ Attach user object to request for downstream use
		// This allows routes to access the authenticated user via req.user
		// ------------------------------------------------------------
		req.user = user

		// ------------------------------------------------------------
		// 7️⃣ Pass control to the next middleware or route handler
		// ------------------------------------------------------------
		next()
	} catch (err) {
		// ------------------------------------------------------------
		// Catch any unexpected errors and respond with 500 JSON
		// ------------------------------------------------------------
		res.status(500).json({
			success: false,
			statusCode: 500,
			message: "Unexpected server error",
		})
	}
}
