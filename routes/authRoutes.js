import "dotenv/config"

import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

const generateToken = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	})

// POST /api/auth/register
router.post("/register", async (req, res, next) => {
	try {
		const { username, email, password } = req.body

		const missing = []
		if (!username) missing.push("username")
		if (!email) missing.push("email")
		if (!password) missing.push("password")
		if (missing.length > 0) {
			const err = new Error(`Missing required fields: ${missing.join(", ")}`)
			err.statusCode = 400
			return next(err)
		}

		if (password.length < 8) {
			const err = new Error("Password must be at least 8 characters")
			err.statusCode = 400
			return next(err)
		}

		const user = await User.create({ username, email, password })

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
		next(err)
	}
})

// POST /api/auth/login
router.post("/login", async (req, res, next) => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			const err = new Error("Email and password are required")
			err.statusCode = 400
			return next(err)
		}

		const user = await User.findOne({ email })
		if (!user || !(await user.matchPassword(password))) {
			const err = new Error("Invalid email or password")
			err.statusCode = 401
			return next(err)
		}

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
})

export default router
