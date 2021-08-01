const express = require("express");
const router = express.Router();
const {
  getProductById,
  getProducts,
  deleteProduct,
} = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMidleware");

router.get("/", getProducts);

router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);

module.exports = router;
