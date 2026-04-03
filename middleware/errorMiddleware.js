// ============================================================
// 404 — catch-all for unmatched routes
// ============================================================
export const notFound = (req, res, next) => {
	// Create a 404 error for any route that doesn't match
	const err = new Error(`Resource not found — ${req.originalUrl}`)
	err.statusCode = 404
	next(err) // pass to global error handler
}

// ============================================================
// Global error handler middleware
// ============================================================
export const errorHandler = (err, req, res, next) => {
	// Default to 500 if statusCode not set
	let statusCode = err.statusCode || 500
	let message = err.message || "Internal server error"
	let errors = null

	// ------------------------------------------------------------
	// 400 Bad Request — Mongoose validation errors
	// ------------------------------------------------------------
	if (err.name === "ValidationError") {
		statusCode = 400
		message = "Invalid input or missing fields"
		// Map all validation errors to an array
		errors = Object.values(err.errors).map((e) => ({
			field: e.path,
			message: e.message,
		}))
	}

	// ------------------------------------------------------------
	// 400 Bad Request — Mongoose bad ObjectId
	// ------------------------------------------------------------
	if (err.name === "CastError" && err.kind === "ObjectId") {
		statusCode = 400
		message = `Invalid ID format: '${err.value}'`
	}

	// ------------------------------------------------------------
	// 409 Conflict — Duplicate key (e.g., unique field)
	// ------------------------------------------------------------
	if (err.code === 11000) {
		statusCode = 409
		const field = Object.keys(err.keyValue)[0]
		message = `'${field}' already exists`
	}

	// ------------------------------------------------------------
	// 401 Unauthorized — JWT issues
	// ------------------------------------------------------------
	if (err.name === "UnauthorizedError") {
		statusCode = 401
		message = "Missing or invalid JWT token"
	}

	// ------------------------------------------------------------
	// 404 Not Found — resource-level not found
	// ------------------------------------------------------------
	if (statusCode === 404) {
		message = message || "Resource not found"
	}

	// ------------------------------------------------------------
	// 500 Internal Server Error — fallback
	// ------------------------------------------------------------
	if (statusCode === 500) {
		message = message || "Unexpected server error"
	}

	// ------------------------------------------------------------
	// Send JSON response with optional stack trace in development
	// ------------------------------------------------------------
	res.status(statusCode).json({
		success: false,
		statusCode,
		message,
		...(errors && { errors }),
		...(process.env.NODE_ENV === "development" && { stack: err.stack }),
	})
}
