# 🛒 Full Stack E-Commerce Platform

A production-ready full-stack E-Commerce web application built using the MERN stack architecture.  
The system includes a customer-facing storefront, a secure backend API, and a dedicated admin panel for product and order management.

---

## 📂 Project Structure

```
root/
│
├── frontend/   → Customer-facing React application
├── backend/    → Node.js + Express API server
└── admin/      → Admin dashboard for managing products & orders
```

---

## 🚀 Features

### 👤 User Features (Frontend)
- User Registration & Login (JWT Authentication)
- Browse Products
- Add to Cart
- Place Orders
- Secure Authentication
- Responsive UI

### 🛠 Admin Features (Admin Panel)
- Add New Products
- Edit Products
- Delete Products
- Upload Product Images (Cloudinary)
- Manage Orders
- Manage Product Inventory

### 🔐 Backend Features
- RESTful API Architecture
- Secure JWT-based Authentication
- Role-based Authorization (Admin / User)
- MongoDB Database Integration
- Cloudinary Image Upload Integration
- Environment-based Configuration

---

## 🛠 Tech Stack

**Frontend:** React.js  
**Admin Panel:** React.js  
**Backend:** Node.js + Express.js  
**Database:** MongoDB  
**Cloud Storage:** Cloudinary  
**Authentication:** JSON Web Tokens (JWT)

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` folder and add the following variables:

```env
MONGODB_URI=""
CLOUDINARY_API_KEY=""
CLOUDINARY_SECRET_KEY=""
CLOUDINARY_NAME=""
JWT_SECRET=""
ADMIN_EMAIL=""
ADMIN_PASSWORD=""
```

---

## 🔐 Environment Variable Explanation

### MONGODB_URI
Connection string for MongoDB database.

Example:
```
mongodb+srv://username:password@cluster.mongodb.net/database_name
```

Used by the backend to connect to the database.

---

### CLOUDINARY_API_KEY
Cloudinary API key used for authenticated image uploads.

---

### CLOUDINARY_SECRET_KEY
Cloudinary secret key used for secure server-side upload authorization.

⚠️ Never expose this on the frontend.

---

### CLOUDINARY_NAME
Your Cloudinary cloud name (account identifier).

---

### JWT_SECRET
Secret key used to sign and verify authentication tokens.

⚠️ Use a long, random, secure string in production.

Example:
```
JWT_SECRET=super_secure_random_string_here
```

---

### ADMIN_EMAIL
Default admin login email used for system initialization.

---

### ADMIN_PASSWORD
Default admin password used for admin panel access.

⚠️ Change this after first login in production.

---

## 🏁 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/repository-name.git
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file and add required variables.

Start backend:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm start
```

---

### 4️⃣ Setup Admin Panel

```bash
cd admin
npm install
npm start
```

---

## 🔒 Security Notes

- Do NOT commit your `.env` file.
- Ensure `.env` is added to `.gitignore`.
- Rotate any exposed credentials before deployment.
- Use strong passwords and secure JWT secrets.

---

## 📈 Future Enhancements

- Payment Gateway Integration
- Order Tracking System
- Product Reviews & Ratings
- Wishlist Functionality
- Advanced Analytics Dashboard
- Email Notifications

---

## 👨‍💻 Author

Developed as a full-stack MERN application demonstrating scalable architecture, authentication handling, cloud integrations, and admin-level control systems.
