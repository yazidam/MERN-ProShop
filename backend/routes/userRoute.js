const express = require('express');
const router = express.Router();
const {
  authUser,
  getUserProfile,
  registerUser,
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.post('/', registerUser);

// router.get('/:id', getProductById);

module.exports = router;
