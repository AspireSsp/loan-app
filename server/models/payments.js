const mongoose = require('mongoose');

// Define schema for payment
const paymentSchema = new mongoose.Schema({
    installment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Installment',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
});

// Create model from schema
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
