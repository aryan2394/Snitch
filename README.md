<h1 align="center">
  <img src="https://img.shields.io/badge/Snitch-Men's%20Fashion%20Platform-black?style=for-the-badge" alt="Snitch" />
</h1>

<p align="center">
  <strong>A full-stack Men's Fashion &amp; E-Commerce platform built with the MERN stack.</strong><br/>
  Featuring secure payments, role-based access control, real-time stock validation, and scalable product management.
</p>

<p align="center">
  <a href="https://snitch-1-gw3c.onrender.com/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React.js-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Razorpay-02042B?style=flat-square&logo=razorpay&logoColor=3395FF" />
  <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
</p>

---

## 📌 About the Project

**Snitch** is a production-grade Men's Fashion e-commerce platform designed for scalability, security, and a smooth shopping experience. It handles everything from product discovery and variant selection to cart management, authentication, and payment processing.

> **Live Demo:** [https://snitch-1-gw3c.onrender.com/](https://snitch-1-gw3c.onrender.com/)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Redux Toolkit, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (with Aggregation Pipelines) |
| **Authentication** | JWT, Google OAuth 2.0 |
| **Payments** | Razorpay |
| **Authorization** | Role-Based Access Control (RBAC) |

---

## ✨ Key Engineering Highlights

### 🛒 Tamper-Resistant Cart Totals via MongoDB Aggregation
- Engineered **MongoDB aggregation pipelines** to compute real-time cart totals entirely on the server side.
- Prices and discounts are never trusted from the client — all totals are computed from the source of truth in the database, preventing any client-side price manipulation at scale.

### 💳 Razorpay Payment Gateway Integration
- Integrated **Razorpay** for end-to-end payment processing including order creation, payment capture, and **HMAC-SHA256 signature verification**.
- Ensures every payment callback is cryptographically verified before order fulfillment, preventing spoofed or replayed payment events.

### 📦 Multi-Attribute Product Variants
- Built a flexible product variant system supporting multiple attributes: **size, color, and stock level**.
- Implemented **real-time stock validation** on both frontend (disabling out-of-stock options) and backend (enforcing stock limits at the API layer) to prevent overselling.

### 🔐 Authentication & Authorization
- Implemented **Google OAuth 2.0** for seamless one-click social login.
- Secured all routes with **JWT-based authentication** — tokens are issued on login and validated on every protected request.
- Built **Role-Based Access Control (RBAC)** middleware to enforce permission boundaries between regular users and administrators.

### 🔍 Product Search & Pagination
- Developed efficient **product search** using MongoDB `$regex` queries for flexible, case-insensitive keyword matching across product names and categories.
- Implemented **server-side pagination** using MongoDB's `skip` and `limit` operators to keep API responses lean and performant at scale.

---

## 📁 Project Structure

```
Snitch/
├── overall/              # Main production-ready application
│   ├── frontend/         # React.js + Redux Toolkit + Tailwind CSS
│   │   └── src/
│   │       ├── components/   # Reusable UI components
│   │       ├── pages/        # Route-level page components
│   │       ├── store/        # Redux slices and store configuration
│   │       └── utils/        # Helper functions and API clients
│   └── backend/          # Node.js + Express.js REST API
│       └── src/
│           ├── controllers/  # Request handlers
│           ├── models/       # Mongoose schemas (User, Product, Order, Cart)
│           ├── routes/       # API route definitions
│           ├── middlewares/  # Auth (JWT), RBAC, error handling
│           └── utils/        # Razorpay helpers, aggregation pipelines
├── Day142/ - Day156/     # Day-wise development iterations
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Razorpay account (for payment keys)
- Google OAuth credentials

### 1. Clone the Repository
```bash
git clone https://github.com/aryan2394/Snitch.git
cd Snitch/overall
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📸 Features at a Glance

- 🛍️ **Product Catalog** — Browse men's fashion with filters and real-time search
- 🎨 **Product Variants** — Select size and color with live stock status
- 🛒 **Smart Cart** — Server-computed totals, tamper-proof pricing
- 💳 **Secure Checkout** — Razorpay-powered payments with signature verification
- 🔐 **Auth System** — Email/password + Google OAuth, JWT sessions
- 👮 **Admin Panel** — RBAC-protected dashboard for product and order management
- 📄 **Pagination** — Smooth browsing with server-side paginated product listings

---

## 🌐 Live Deployment

| Environment | URL |
|---|---|
| Production | [https://snitch-1-gw3c.onrender.com/](https://snitch-1-gw3c.onrender.com/) |
| Hosted on | [Render](https://render.com) |

---

## 👨‍💻 Author

**Aryan** — Full Stack Developer  
Built as part of a structured day-wise development challenge, iterating from Day 142 to Day 156.

---

<p align="center">Made with ❤️ &nbsp;·&nbsp; <a href="https://snitch-1-gw3c.onrender.com/">Live Demo</a></p>
