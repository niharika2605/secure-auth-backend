# Secure Auth System

A production-ready full-stack authentication system built with React, Node.js, Express, and MongoDB Atlas. Implements industry-standard security practices including JWT authentication, bcrypt password hashing, refresh token rotation, rate limiting, and role-based access control.

## Live Demo

👉 **[https://secure-auth-system-two.vercel.app](https://secure-auth-system-two.vercel.app)**

## Preview

> Register → Login → Access Protected Profile with live session timer and JWT token display.

---

## Architecture


Frontend (React + Vite)          →   Vercel
        ↓
Backend API (Node.js + Express)  →   Render
        ↓
Database (MongoDB Atlas)         →   Cloud


---

## Features

-  User Registration with input validation
-  Secure Login with bcrypt password comparison
-  JWT Access Token (15 min expiry)
-  Refresh Token system (7 day expiry)
-  Protected routes with middleware
-  Token revocation on logout
-  Rate limiting (100 requests / 15 min)
-  Role-based access control
-  CORS protection
-  Live session countdown timer on frontend
-  Password strength indicator
-  Fully responsive UI

---

## Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React, Vite |
| Backend    | Node.js, Express.js |
| Database   | MongoDB Atlas |
| Auth       | JWT, bcrypt |
| Validation | express-validator |
| Security   | Helmet, CORS, Rate Limiting |
| Deployment | Vercel (frontend), Render (backend) |

---

##  Authentication Flow

### Register
- Validates input fields
- Checks if user already exists
- Hashes password with bcrypt
- Stores user in MongoDB

### Login
- Finds user by email
- Compares password with bcrypt
- Generates Access Token (15 min) + Refresh Token (7 days)
- Stores refresh token in DB

### Access Protected Route
```
Authorization: Bearer <accessToken>
```
- Middleware verifies JWT
- Extracts user info
- Grants or denies access

### Refresh Token
- Frontend sends refresh token
- Backend verifies and checks DB
- New access token is issued

### Logout
- Refresh token deleted from DB
- Token cannot be reused

---

## 🔗 API Endpoints

| Method | Endpoint           | Description          | Auth Required |
|--------|--------------------|----------------------|---------------|
| POST | `/api/auth/register` | Register new user    | ❌ |
| POST | `/api/auth/login`    | Login user           | ❌ |
| GET | `/api/auth/profile`   | Get user profile     | ✅ |
| POST | `/api/auth/refresh`  | Refresh access token | ❌ |
| POST | `/api/auth/logout`   | Logout user          | ✅ |

---

## Security Features

- **bcrypt** — passwords never stored as plain text
- **JWT** — tokens signed with secret keys, prevents tampering
- **Access + Refresh Token** — short-lived access for safety, long-lived refresh for UX
- **Token Revocation** — logout invalidates refresh token
- **Rate Limiting** — 100 requests per 15 minutes per IP
- **Helmet** — secure HTTP headers
- **Input Validation** — email format, password length, required fields
- **CORS** — only allows requests from trusted origins

---

## Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend

```bash
# Clone the repo
git clone https://github.com/niharika2605/secure-auth-system.git
cd secure-auth-system

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your values (see Environment Variables below)

# Start the server
npm run dev
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

### Environment Variables

Create a `.env` file in the root of your backend:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
```

---

## 📁 Project Structure
```
secure-auth-system/
├── config/
│   └── db.js
├── controllers/
│   └── authController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── userModel.js
├── routes/
│   └── authRoutes.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
├── server.js
└── .env
```

---

## 🌍 Deployment

| Service  | Platform      | URL |
|----------|---------------|-----|
| Frontend | Vercel        | https://secure-auth-system-two.vercel.app |
| Backend  | Render        | https://secure-auth-backend-a9u9.onrender.com |
| Database | MongoDB Atlas | Cloud hosted |

> The backend is hosted on Render's free tier and may take 30-60 seconds to wake up after inactivity.

---

##  Author

**Niharika** — [@niharika2605](https://github.com/niharika2605)

---

## License

This project is open source and available under the [MIT License](LICENSE).
