# 🛒 ShoppyGlobe E-Commerce Backend API

A RESTful backend API for the **ShoppyGlobe** e-commerce application, built with **Node.js**, **Express.js**, and **MongoDB**. Supports product management, shopping cart operations, and JWT-based user authentication.

---

## 📝 Author

**Akash Damle**
[:octocat: code-kasha](https://github.com/code-kasha)

## 📦 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **API Testing:** ThunderClient

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/code-kasha/shoppy-globe-api
cd shoppy-globe-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shoppyglobe
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

### Running the Server

```bash
# Development mode
npm run dev

# Seed Data - Connect to the database and run
node ./data/seedProducts.js

# Production mode
npm start
```

The server will start at `http://localhost:5000`.

---

## 🗄️ MongoDB Collections

### Products Collection

| Field         | Type   | Description                |
| ------------- | ------ | -------------------------- |
| `name`        | String | Name of the product        |
| `price`       | Number | Price of the product       |
| `description` | String | Description of the product |
| `stockQty`    | Number | Available stock quantity   |

### Cart Collection

| Field       | Type     | Description                         |
| ----------- | -------- | ----------------------------------- |
| `userId`    | ObjectId | Reference to the authenticated user |
| `productId` | ObjectId | Reference to the product            |
| `quantity`  | Number   | Quantity of the product in cart     |

### Users Collection

| Field      | Type   | Description              |
| ---------- | ------ | ------------------------ |
| `username` | String | Unique username          |
| `email`    | String | User's email address     |
| `password` | String | Hashed password (bcrypt) |

---

## 📡 API Endpoints

### 🔐 Authentication Routes

| Method | Endpoint    | Description                    | Auth Required |
| ------ | ----------- | ------------------------------ | ------------- |
| POST   | `/register` | Register a new user            | ❌ No         |
| POST   | `/login`    | Authenticate and get JWT token | ❌ No         |

### 📦 Product Routes

| Method | Endpoint        | Description                  | Auth Required |
| ------ | --------------- | ---------------------------- | ------------- |
| GET    | `/products`     | Fetch all products           | ❌ No         |
| GET    | `/products/:id` | Fetch a single product by ID | ❌ No         |

### 🛒 Cart Routes _(Protected — JWT required)_

| Method | Endpoint    | Description                    | Auth Required |
| ------ | ----------- | ------------------------------ | ------------- |
| POST   | `/cart`     | Add a product to the cart      | ✅ Yes        |
| PUT    | `/cart/:id` | Update quantity of a cart item | ✅ Yes        |
| DELETE | `/cart/:id` | Remove a product from the cart | ✅ Yes        |

---

## 🔑 Authentication

This API uses **JWT (JSON Web Token)** for authentication.

1. Register or log in to receive a token.
2. Include the token in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_token_here>
```

---

## ⚠️ Error Handling

All routes include structured error handling:

- `400 Bad Request` — Invalid input or missing fields
- `401 Unauthorized` — Missing or invalid JWT token
- `404 Not Found` — Resource (product/cart item) not found
- `500 Internal Server Error` — Unexpected server error

---

## 🧪 Testing with ThunderClient

All routes have been tested using **ThunderClient** (VS Code extension). Screenshots of test results are available in the `/screenshots` folder.

**Test coverage includes:**

- User registration and login
- Fetching all products and single product
- Adding, updating, and removing cart items
- Validation and error response testing
- JWT-protected route access verification

---

## 📁 Project Structure

```
shoppyglobe-backend/
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── cartController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Cart.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── cartRoutes.js
├── screenshots/           # ThunderClient test screenshots
├── .env.example
├── .gitignore
├── CHECKLIST.md
├── package-lock.json
├── package.json
├── Problem Statement.js
├── README.md
└── server.js
```

---

## 📸 MongoDB Screenshots

Screenshots from the MongoDB database (collections view, sample documents) are included in the `/screenshots` folder.

---

## 📝 License

This project was created as part of a full-stack development assignment. All rights reserved.
