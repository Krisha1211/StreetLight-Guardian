const express = require('express');
const router = express.Router();
const passport = require('passport');
const Admin = require('../models/admins');

// Signup Route
router.get('/createAdmin', (req, res) => {
    res.render('createAdmin');
});

router.post('/createAdmin', async (req, res, next) => {
    try {
        // Check if the email is already in use
        const existingAdmin = await Admin.findOne({ email: req.body.email });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create a new Admin
        const newAdmin = new Admin({
            name: req.body.name,
            email: req.body.email,
            phoneNumber:req.body.number
        });

        Admin.register(newAdmin, req.body.password, (err) => {
            if (err) {
                // Handle registration error
                return next(err);
            }
            // Registration successful, redirect to login page
            res.redirect(`/dashboard`);
           
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
