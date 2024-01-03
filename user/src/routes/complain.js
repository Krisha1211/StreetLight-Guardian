const express = require("express");
const feedbackCounter = require("../models/feedbackCounter");
const user = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/", async (req, res) => {
        const complaintNumber = await generateUniqueFeedbackNumber();

        // Create a new user document
        const newUser = new user({
            electricityBoard: req.body.electricityBoard,
            poleNumber: req.body.poleNumber,
            city: req.body.city,
            subStation: req.body.subStation,
            complaintHeader: req.body.complaintHeader,
            complaintDetails: req.body.complaintDetails,
            complaintNumber: complaintNumber,
        });

        // Save the user document to the database
    await newUser.save();
    
    res.redirect("/thanks");
});

async function generateUniqueFeedbackNumber() {
    let counter = await feedbackCounter.findOneAndUpdate({}, { $inc: { count: 1 } });
    if (!counter) {
        // If the counter document doesn't exist, create one.
        counter = new feedbackCounter();
        await counter.save();
    }
    return counter.count;
}

module.exports = router;

