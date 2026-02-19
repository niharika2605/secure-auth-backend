const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// 🔐 Rate Limiter (DEFINE FIRST)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests, please try again later.",
});

// THEN USE IT
app.use(limiter);

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Auth Server Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
