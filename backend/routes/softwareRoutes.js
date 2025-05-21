// backend/routes/softwareRoutes.js
const express = require('express');
const router = express.Router();
const softwareController = require('../controllers/softwareController'); // <<< IMPORT THE CONTROLLER
const authMiddleware = require('../middleware/authMiddleware'); // For protecting routes

// POST /api/software - Create new software (Admin only)
router.post('/', authMiddleware(['Admin']), softwareController.createSoftware); // <<< ADDED/CORRECTED THIS LINE

// GET /api/software - Get list of software (Accessible to authenticated users)
router.get('/', authMiddleware(), softwareController.listSoftware); // <<< Used controller function, and () for middleware

module.exports = router;