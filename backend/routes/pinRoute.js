const express = require("express");
const router = express.Router();
const { addPinToMpa, getAllPins } = require("../controllers/pinController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMidleware");

router.route("/").post(protect, admin, addPinToMpa);
router.route("/get_all_pins").get(protect, admin, getAllPins);

module.exports = router;
