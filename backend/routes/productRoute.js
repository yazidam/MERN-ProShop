const express = require("express");
const router = express.Router();
const {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProduct,
} = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMidleware");

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

module.exports = router;
