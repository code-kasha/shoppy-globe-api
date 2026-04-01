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

- [🔄 In Progress] `GET /products/:id` — Fetch a single product by ID
- [🔄 In Progress] `GET /products` — Fetch all products from MongoDB

### Cart Routes

- [🔄 In Progress] `POST /cart` — Add a product to the shopping cart
- [🔄 In Progress] `PUT /cart/:id` — Update quantity of a product in the cart
- [🔄 In Progress] `DELETE /cart/:id` — Remove a product from the cart

---

## 2. 🗄️ MongoDB Integration _(50 marks)_

- [🔄 In Progress] Set up MongoDB (local or Atlas)
- [🔄 In Progress] Create **Products** collection with schema:
  - [🔄 In Progress] `name` (String)
  - [🔄 In Progress] `price` (Number)
  - [🔄 In Progress] `description` (String)
  - [🔄 In Progress] `stockQty` (Number)
- [🔄 In Progress] Create **Cart** collection with schema:
  - [🔄 In Progress] `userId` (ObjectId reference)
  - [🔄 In Progress] `productId` (ObjectId reference)
  - [🔄 In Progress] `quantity` (Number)
- [🔄 In Progress] Implement CRUD for Products collection
- [🔄 In Progress] Implement CRUD for Cart collection
- [🔄 In Progress] Seed or manually add sample product data
- [🔄 In Progress] Take and save **screenshots from MongoDB Database**

---

## 3. ⚠️ API Error Handling and Validation _(20 marks)_

- [⬜ Pending] Add error handling middleware to Express
- [⬜ Pending] Handle `404` — Resource not found
- [⬜ Pending] Handle `400` — Bad request / invalid input
- [⬜ Pending] Handle `500` — Internal server errors
- [⬜ Pending] Validate product ID exists before adding to cart
- [⬜ Pending] Validate request body fields (e.g., quantity > 0)
- [⬜ Pending] Return consistent JSON error responses

---

## 4. 🔐 Authentication & Authorization _(60 marks)_

- [⬜ Pending] Install `jsonwebtoken` and `bcryptjs` packages
- [⬜ Pending] Create **User** model/schema:
  - [⬜ Pending] `username` (String, unique)
  - [⬜ Pending] `email` (String, unique)
  - [⬜ Pending] `password` (String, hashed)

### Auth Routes

- [⬜ Pending] `POST /register` — Register a new user (hash password before saving)
- [⬜ Pending] `POST /login` — Authenticate user and return a JWT token

### Route Protection

- [⬜ Pending] Create JWT authentication middleware
- [⬜ Pending] Protect `POST /cart` with auth middleware
- [⬜ Pending] Protect `PUT /cart/:id` with auth middleware
- [⬜ Pending] Protect `DELETE /cart/:id` with auth middleware
- [⬜ Pending] Return `401 Unauthorized` for missing/invalid tokens

---

## 5. 🧪 Testing with ThunderClient _(35 marks)_

- [⬜ Pending] Install ThunderClient extension in VS Code
- [⬜ Pending] Test `POST /register` and save screenshot
- [⬜ Pending] Test `POST /login` and save screenshot (verify token returned)
- [⬜ Pending] Test `GET /products` and save screenshot
- [⬜ Pending] Test `GET /products/:id` (valid ID) and save screenshot
- [⬜ Pending] Test `GET /products/:id` (invalid ID) and save screenshot
- [⬜ Pending] Test `POST /cart` (with JWT token) and save screenshot
- [⬜ Pending] Test `PUT /cart/:id` (with JWT token) and save screenshot
- [⬜ Pending] Test `DELETE /cart/:id` (with JWT token) and save screenshot
- [⬜ Pending] Test `POST /cart` without token (expect 401) and save screenshot
- [⬜ Pending] Save all screenshots in `/screenshots` folder

---

## 6. 📤 Submission Guidelines _(25 marks)_

### Code Quality _(10 marks)_

- [⬜ Pending] API runs without errors
- [⬜ Pending] All routes respond correctly
- [⬜ Pending] No unhandled promise rejections or crashes

### GitHub Submission _(10 marks)_

- [⬜ Pending] Push code to a public GitHub repository
- [⬜ Pending] Include all source files (excluding `node_modules` and `.env`)
- [⬜ Pending] Add `.gitignore` file
- [⬜ Pending] Include API testing screenshots in the repo

### Documentation & Comments _(5 marks)_

- [⬜ Pending] Add inline comments explaining key logic
- [⬜ Pending] Write clear and complete `README.md`
- [⬜ Pending] Document all API endpoints (method, URL, request body, response)

---

## 📊 Marks Summary

| Section                           | Marks   | Status     |
| --------------------------------- | ------- | ---------- |
| Node.js and Express API Setup     | 60      | ⬜ Pending |
| MongoDB Integration               | 50      | ⬜ Pending |
| API Error Handling and Validation | 20      | ⬜ Pending |
| Authentication & Authorization    | 60      | ⬜ Pending |
| Testing with ThunderClient        | 35      | ⬜ Pending |
| Submission Guidelines             | 25      | ⬜ Pending |
| **Total**                         | **250** | —          |
