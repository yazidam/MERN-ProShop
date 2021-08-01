const { Router } = require("express");
const express = require("express");
const router = express.Router();
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  reset_password,
  new_password,
  getUsers,
  deleteUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMidleware");
router.post("/login", authUser);
// router.get('/profile', protect, getUserProfile);
// router.put('/update', updateUserProfile);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
// router.get("/ahmed", getUsers); get all user method o5raa
router.route("/").post(registerUser).get(protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

router.post("/reset", reset_password);
router.post("/new_pass", new_password);

// router.get('/:id', getProductById);

module.exports = router;
