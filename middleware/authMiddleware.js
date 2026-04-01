import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protect = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			const err = new Error("Not authorized — no token provided")
			err.statusCode = 401
			return next(err)
		}

		const token = authHeader.split(" ")[1]

		let decoded
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET)
		} catch {
			const err = new Error("Not authorized — token is invalid or expired")
			err.statusCode = 401
			return next(err)
		}

		const user = await User.findById(decoded.id).select("-password")
		if (!user) {
			const err = new Error("Not authorized — user no longer exists")
			err.statusCode = 401
			return next(err)
		}

		req.user = user
		next()
	} catch (err) {
		next(err)
	}
}
