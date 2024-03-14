const mongoose = require('mongoose');

// Define schema for loan application
const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    loan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
    approvalDate: {
        type: Date
    },
    rejectionReason: {
        type: String
    },
},{
    timestamps: true
});

// Create model from schema
const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
