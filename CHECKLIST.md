# ✅ ShoppyGlobe Backend — Project Checklist

Track your progress on each requirement. Check off items as you complete them.

---

## 1. 🛠️ Node.js and Express API Setup _(60 marks)_

- [✅ Done] Initialize a Node.js project (`npm init`)
- [✅ Done] Install and configure Express.js
- [✅ Done] Create base server file (`server.js` or `app.js`)
- [✅ Done] Connect to MongoDB using Mongoose
- [✅ Done] Set up `.env` file for environment variables

### Product Routes

- [✅ Done] `GET /products/:id` — Fetch a single product by ID
- [✅ Done] `GET /products` — Fetch all products from MongoDB

### Cart Routes

- [✅ Done] `POST /cart` — Add a product to the shopping cart
- [✅ Done] `PUT /cart/:id` — Update quantity of a product in the cart
- [✅ Done] `DELETE /cart/:id` — Remove a product from the cart

---

## 2. 🗄️ MongoDB Integration _(50 marks)_

- [✅ Done] Set up MongoDB (local or Atlas)
- [✅ Done] Create **Products** collection with schema:
  - [✅ Done] `name` (String)
  - [✅ Done] `price` (Number)
  - [✅ Done] `description` (String)
  - [✅ Done] `stockQty` (Number)
- [✅ Done] Create **Cart** collection with schema:
  - [✅ Done] `userId` (ObjectId reference)
  - [✅ Done] `productId` (ObjectId reference)
  - [✅ Done] `quantity` (Number)
- [✅ Done] Implement CRUD for Products collection
- [✅ Done] Implement CRUD for Cart collection
- [✅ Done] Seed or manually add sample product data
- [✅ Done] Take and save **screenshots from MongoDB Database**

---

## 3. ⚠️ API Error Handling and Validation _(20 marks)_

- [✅ Done] Add error handling middleware to Express
- [✅ Done] Handle `404` — Resource not found
- [✅ Done] Handle `400` — Bad request / invalid input
- [✅ Done] Handle `500` — Internal server errors
- [✅ Done] Validate product ID exists before adding to cart
- [✅ Done] Validate request body fields (e.g., quantity > 0)
- [✅ Done] Return consistent JSON error responses

---

## 4. 🔐 Authentication & Authorization _(60 marks)_

- [✅ Done] Install `jsonwebtoken` and `bcryptjs` packages
- [✅ Done] Create **User** model/schema:
  - [✅ Done] `username` (String, unique)
  - [✅ Done] `email` (String, unique)
  - [✅ Done] `password` (String, hashed)

### Auth Routes

- [✅ Done] `POST /register` — Register a new user (hash password before saving)
- [✅ Done] `POST /login` — Authenticate user and return a JWT token

### Route Protection

- [✅ Done] Create JWT authentication middleware
- [✅ Done] Protect `POST /cart` with auth middleware
- [✅ Done] Protect `PUT /cart/:id` with auth middleware
- [✅ Done] Protect `DELETE /cart/:id` with auth middleware
- [✅ Done] Return `401 Unauthorized` for missing/invalid tokens

---

## 5. 🧪 Testing with ThunderClient _(35 marks)_

- [✅ Done] Install ThunderClient extension in VS Code
- [✅ Done] Test `POST /register` and save screenshot
- [✅ Done] Test `POST /login` and save screenshot (verify token returned)
- [✅ Done] Test `GET /products` and save screenshot
- [✅ Done] Test `GET /products/:id` (valid ID) and save screenshot
- [✅ Done] Test `GET /products/:id` (invalid ID) and save screenshot
- [✅ Done] Test `POST /cart` (with JWT token) and save screenshot
- [✅ Done] Test `PUT /cart/:id` (with JWT token) and save screenshot
- [✅ Done] Test `DELETE /cart/:id` (with JWT token) and save screenshot
- [✅ Done] Test `POST /cart` without token (expect 401) and save screenshot
- [✅ Done] Save all screenshots in `/screenshots` folder

---

## 6. 📤 Submission Guidelines _(25 marks)_

### Code Quality _(10 marks)_

- [✅ Done] API runs without errors
- [✅ Done] All routes respond correctly
- [✅ Done] No unhandled promise rejections or crashes

### GitHub Submission _(10 marks)_

- [✅ Done] Push code to a public GitHub repository
- [✅ Done] Include all source files (excluding `node_modules` and `.env`)
- [✅ Done] Add `.gitignore` file
- [✅ Done] Include API testing screenshots in the repo

### Documentation & Comments _(5 marks)_

- [✅ Done] Add inline comments explaining key logic
- [✅ Done] Write clear and complete `README.md`
- [✅ Done] Document all API endpoints (method, URL, request body, response)

---

## 📊 Marks Summary

| Section                           | Marks   | Status |
| --------------------------------- | ------- | ------ |
| Node.js and Express API Setup     | 60      | ✅     |
| MongoDB Integration               | 50      | ✅     |
| API Error Handling and Validation | 20      | ✅     |
| Authentication & Authorization    | 60      | ✅     |
| Testing with ThunderClient        | 35      | ✅     |
| Submission Guidelines             | 25      | ✅     |
| **Total**                         | **250** | ------ |
