const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

// Payment routes
router.get('/api/payments', authMiddleware.authenticateUser, paymentController.getAllPayments);
router.get('/api/payments/:id', authMiddleware.authenticateUser, paymentController.getPaymentById);
router.post('/api/payments/:id/cancel', authMiddleware.authenticateUser, paymentController.cancelPayment);
router.post('/api/payments/:id/refund', authMiddleware.authenticateUser, paymentController.refundPayment);

module.exports = router;