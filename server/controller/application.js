const Application = require("../models/application");


// POST submit a loan application
exports.submitApplication = async (req, res) => {
    try {
        const app = await Application.find({user: req.user._id, loan: req.body.loan})
        if(app.length>0){
            res.status(422).json({message: "this loan has been already taken"});
        }else{
            const application = new Application({user: req.user._id, ...req.body});
            const newApplication = await application.save();
            res.status(201).json(newApplication);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// GET details of a specific loan application by ID
exports.getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate('user').populate('loan');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET all loan applications
exports.getAllApplications = async (req, res) => {
    // Add logic to check admin role before fetching applications if required
    try {
        const applications = await Application.find({status: req.query.status}).populate('loan', ['title', 'amount' ]).populate('user', 'name');
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET my loan applications
exports.myLoans = async (req, res) => {
    // Add logic to check admin role before fetching applications if required
    try {
        const applications = await Application.find({user: req.user._id}).populate('loan');
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT approve or reject a loan application
exports.updateApplication = async (req, res) => {
    // Add logic to check admin role before updating application if required
    try {
        const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
