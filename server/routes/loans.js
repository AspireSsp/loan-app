const express = require('express');
const router = express.Router();

const { createLoan, getAllLoans, updateLoan, deleteLoan, getLoanById } = require('../controller/loan');

// Loan management routes
router.get('/get', getAllLoans);
router.get('/get/:id', getLoanById);
router.post('/add', createLoan);
router.patch('/update/:id', updateLoan);
router.delete('/delete/:id', deleteLoan);


module.exports = router;

