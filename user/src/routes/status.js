const express = require('express');
const router = express.Router();
const Complains = require("../models/complains")

router.get('/status', (req, res) => {
    res.render('status'); 
});

router.post("/status", async (req, res) => {
    const number = parseInt(req.body.complainNumber);

    try {
        const ComplainData = await Complains.findOne({ "complainNumber": number });

        console.log(ComplainData)

        if (ComplainData) {
            res.render("status", { data: ComplainData });
        } else {
            res.render("status", { error: "Complaint not found" });
        }
    } catch (error) {
        // Handle database query error
        res.render("status", { error: "Error fetching complaint data" });
    }
});
module.exports = router;
