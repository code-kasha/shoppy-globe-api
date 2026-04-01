// 404 — catch-all for unmatched routes
export const notFound = (req, res, next) => {
	const err = new Error(`Not found — ${req.originalUrl}`)
	err.statusCode = 404
	next(err)
}

// Global error handler
export const errorHandler = (err, req, res, next) => {
	let statusCode = err.statusCode || 500
	let message = err.message || "Internal server error"
	let errors = null

	// Mongoose validation error (400)
	if (err.name === "ValidationError") {
		statusCode = 400
		message = "Invalid input"
		errors = Object.values(err.errors).map((e) => ({
			field: e.path,
			message: e.message,
		}))
	}

	// Mongoose bad ObjectId (400)
	if (err.name === "CastError" && err.kind === "ObjectId") {
		statusCode = 400
		message = `Invalid ID format: '${err.value}'`
	}

	// Mongoose duplicate key (409)
	if (err.code === 11000) {
		statusCode = 409
		const field = Object.keys(err.keyValue)[0]
		message = `'${field}' already exists`
	}

	res.status(statusCode).json({
		success: false,
		statusCode,
		message,
		...(errors && { errors }),
		...(process.env.NODE_ENV === "development" && { stack: err.stack }),
	})
}
