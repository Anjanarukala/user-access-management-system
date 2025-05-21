// backend/routes/requestRoutes.js
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/requests - Submit a new access request (Employee/User)
router.post('/', authMiddleware(), requestController.requestAccess);

// GET /api/requests/all - Get all access requests (Admin only)
router.get('/all', authMiddleware(['Admin']), requestController.listAllRequests);

// NEW: GET /api/requests/my - Get requests for the logged-in user (Employee/User)
router.get('/my', authMiddleware(), requestController.listMyRequests); // <<< NEW ROUTE

// PUT /api/requests/:requestId/status - Update request status (Approve/Reject) (Admin only)
router.put('/:requestId/status', authMiddleware(['Admin']), requestController.updateRequestStatus);

module.exports = router;
