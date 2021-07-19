const express = require("express");
const router = express.Router();
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  reset_password,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/login", authUser);
// router.get('/profile', protect, getUserProfile);
// router.put('/update', updateUserProfile);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post("/", registerUser);
router.post("/reset", reset_password);

// router.get('/:id', getProductById);

module.exports = router;
