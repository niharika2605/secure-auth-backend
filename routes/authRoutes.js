const express = require("express");
const router = express.Router();
const { registerUser, loginUser, refreshTokenHandler, logoutUser } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { body } = require("express-validator");





router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Profile accessed",
    user: req.user,
  });
});
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});
router.post("/refresh", refreshTokenHandler);
router.post("/logout", logoutUser);
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);




module.exports = router;
