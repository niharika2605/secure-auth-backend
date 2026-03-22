const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS CONFIG (FIXED)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://secure-auth-system-two.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(helmet());

// 🔐 Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

app.use(limiter);

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Auth Server Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
