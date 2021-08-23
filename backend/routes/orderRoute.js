const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMidleware");

router.route("/myorders").get(protect, getMyOrders);

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
module.exports = router;
