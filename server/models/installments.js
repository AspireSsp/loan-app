const mongoose = require('mongoose');

// Define schema for installment
const installmentSchema = new mongoose.Schema({
    loan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    installmentNumber: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'overdue'],
        default: 'overdue'
    }
});

// Create model from schema
const Installment = mongoose.model('Installment', installmentSchema);

module.exports = Installment;
