# 🥗 **FoodoraX – Food Delivery Web App (MERN Stack)**

A full-stack food delivery application built with **React**, **Node.js**, **Express**, **MongoDB**, **Mongoose**, **Leaflet Maps**, and **PayPal Payments**.

FoodoraX allows users to browse food items, search, filter by tags, view details, manage cart, checkout, make payments, track orders on a live map, and update their profile.

---

## 🚀 **Features**

### 🌟 **Frontend (React)**

✔ Fully responsive UI
✔ Modern component structure
✔ Food thumbnails, ratings, tags & filters
✔ Search & tag-based food filtering
✔ Cart management (add/remove/quantity/save to localStorage)
✔ Login / Register with JWT authentication
✔ Checkout page with interactive map
✔ Payment page with PayPal integration
✔ Order tracking with live map
✔ Profile management (update profile + change password)
✔ Orders history page
✔ Loading animations & interceptors
✔ Protected routes with `AuthRoute`

---

### 🛠 **Backend (Node + Express)**

✔ Express REST APIs
✔ MongoDB + Mongoose models
✔ Authentication using JWT
✔ User login, register, update profile, change password
✔ Food APIs (all foods, tags, search, get by id)
✔ Orders APIs (create order, get new order, pay, track)
✔ Seed data for users & foods
✔ Bcrypt for password hashing
✔ Middleware: Auth, error handling, validation
✔ ENV support with dotenv

---

### 💳 **Payments Integration**

✔ PayPal sandbox integrated
✔ Payment verification
✔ Auto-clear cart after successful payment

---

### 🗺 **Maps Integration**

✔ Leaflet + React-Leaflet
✔ Location selection during checkout
✔ Location shown on Payment & Order Tracking
✔ Fixed marker issues + custom map styling

---
## 📦 **Installation & Setup**

### 1️⃣ **Clone the repo**

```bash
git clone https://github.com/ABHIGGGG/FoodoraX.git
cd FoodoraX
```

---

## 🔧 **Backend Setup**

```bash
cd backend
npm install
```

Create `.env`:

```
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_secret_here
PAYPAL_CLIENT_ID=your_paypal_id
```

Start backend:

```bash
npm run dev
```

---

## 🎨 **Frontend Setup**

```bash
cd frontend
npm install
npm start
```

This runs React on **[http://localhost:3000](http://localhost:3000)**

---
## 🧪 **Testing Payments (PayPal)**

1. Create a PayPal Sandbox account
2. Add clientId to `.env`
3. Use PayPal sandbox buyer account for testing

---

## 📜 **Scripts**

### Frontend:

```bash
npm start
npm run build
```

### Backend:

```bash
npm run dev
npm start
```

---

## 🤝 **Contributing**

Pull requests are welcome! If you’d like to make major changes, open an issue first to discuss.

---

## 📄 **License**

MIT License.
