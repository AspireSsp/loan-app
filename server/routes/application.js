const express = require('express');
const router = express.Router();

const { submitApplication, getApplicationById, getAllApplications, updateApplication, myLoans } = require('../controller/application');
const authenticate = require('../middlewares/auth');

// Loan application routes
router.post('/add',authenticate, submitApplication);
router.get('/get', getAllApplications);
router.get('/get/:id', getApplicationById);
router.patch('/update/:id', updateApplication);

router.get('/my-application', authenticate, myLoans )

module.exports = router;