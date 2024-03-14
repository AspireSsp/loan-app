const Application = require("../models/application");
const Installment = require("../models/installments");
const Loan = require("../models/loan");

// GET all available loans
exports.getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.find();
        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET details of a specific loan by ID
exports.getLoanById = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json(loan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST create a new loan
exports.createLoan = async (req, res) => {
    // Add logic to check admin role before creating loan if required
    try {
        const loan = new Loan(req.body);
        const newLoan = await loan.save();
        res.status(201).json(newLoan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT update details of a loan
exports.updateLoan = async (req, res) => {
    // Add logic to check admin role before updating loan if required
    try {
        const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json(loan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE a loan
exports.deleteLoan = async (req, res) => {
    // Add logic to check admin role before deleting loan if required
    try {
        const loan = await Loan.findByIdAndDelete(req.params.id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json({ message: 'Loan deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET the status of all loans for the current user
exports.getLoanStatusForCurrentUser = async (req, res) => {
    try {
        // Assuming the user ID is available in the request object after authentication
        const userId = req.user._id;
        
        // Find all applications for the current user
        const applications = await Application.find({ user: userId });
        
        // Find all installments for the current user
        const installments = await Installment.find({ user: userId });
        
        // Combine data from applications and installments to determine loan status
        const loanStatus = applications.map(application => {
            const loan = application.loan;
            const installmentExists = installments.some(installment => installment.loan.equals(loan));
            return {
                loanId: loan._id,
                title: loan.title,
                description: loan.description,
                status: installmentExists ? 'active' : 'pending' // Assuming if installment exists, loan is active
            };
        });
        
        res.status(200).json(loanStatus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET the status of a specific loan by ID
exports.getLoanStatusById = async (req, res) => {
    try {
        
        const loanId = req.params.id;
        
        // Find loan details
        const loan = await Loan.findById(loanId);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        
        // Find installments for the loan
        const installments = await Installment.find({ loan: loanId });
        
        // Determine loan status based on installments
        const loanStatus = {
            loanId: loan._id,
            title: loan.title,
            description: loan.description,
            status: installments.length > 0 ? 'active' : 'pending' // Assuming if any installment exists, loan is active
        };
        
        res.status(200).json(loanStatus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
