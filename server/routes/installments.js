const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

// Installment routes (if available)
router.get('/api/installments', /* Middleware for getting all installments */);
router.get('/api/installments/:id', /* Middleware for getting a specific installment by ID */);
router.post('/api/installments/:id/pay', /* Middleware for making a payment for a specific installment */);

module.exports = router;
