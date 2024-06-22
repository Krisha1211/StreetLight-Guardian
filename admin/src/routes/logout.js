const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

// Logout route
router.get('/logout', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/")
        }
    });
});

module.exports = router;
