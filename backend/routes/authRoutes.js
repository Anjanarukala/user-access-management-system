// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // For protected logout

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authMiddleware(), authController.logout); // Protect logout if needed

module.exports = router;