const express = require('express');
const router = express.Router();
const { authUser } = require('../controllers/userController');

router.post('/login', authUser);

// router.get('/:id', getProductById);

module.exports = router;
