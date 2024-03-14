const Installment = require("../models/installments");
const Payment = require("../models/payments");


// GET all installments for the current user
exports.getAllInstallmentsForUser = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in the request object after authentication
        const installments = await Installment.find({ user: userId });
        res.status(200).json(installments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET details of a specific installment by ID
exports.getInstallmentById = async (req, res) => {
    try {
        const installment = await Installment.findById(req.params.id);
        if (!installment) {
            return res.status(404).json({ message: 'Installment not found' });
        }
        res.status(200).json(installment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST make a payment for a specific installment
exports.makePayment = async (req, res) => {
    try {
        const installment = await Installment.findById(req.params.id);
        if (!installment) {
            return res.status(404).json({ message: 'Installment not found' });
        }
        
        // Assuming payment details are sent in the request body
        const { amountPaid, paymentMethod } = req.body;
        
        // Create new payment
        const payment = new Payment({
            installment: installment._id,
            user: req.user.id, // Assuming user ID is available in the request object after authentication
            amountPaid,
            paymentMethod
        });
        
        // Save payment
        await payment.save();

        // Update installment payment status
        installment.paymentStatus = 'paid';
        installment.paymentDate = new Date();
        await installment.save();

        res.status(201).json({ message: 'Payment successful' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
