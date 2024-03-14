const Payment = require("../models/payments");


// GET all payments for the current user
exports.getAllPayments = async (req, res) => {
    try {
        // Assuming the user ID is available in the request object after authentication
        const userId = req.user._id;
        const payments = await Payment.find({ user: userId });
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET details of a specific payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST cancel a payment
exports.cancelPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        
        // Add logic to check if payment can be canceled
        // For example, only allow canceling if payment status is pending
        
        // Assuming the payment status is updated and saved
        payment.paymentStatus = 'canceled';
        await payment.save();
        
        res.status(200).json({ message: 'Payment canceled successfully', payment });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// POST refund a payment
exports.refundPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        
        // Add logic to check if payment can be refunded
        // For example, only allow refunding if payment status is completed
        
        // Assuming the payment status is updated and saved
        payment.paymentStatus = 'refunded';
        await payment.save();
        
        res.status(200).json({ message: 'Payment refunded successfully', payment });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
