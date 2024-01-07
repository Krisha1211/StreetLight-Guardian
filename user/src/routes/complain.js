const express = require("express");
const feedbackCounter = require("../models/feedbackCounter");
const user = require("../models/complains");
const router = express.Router();

router.get("/", (req, res) => {
    const districts = ["Ahmedabad",
        "Amreli",
        "Anand",
        "Aravalli",
        "Banaskantha (Palanpur)",
        "Bharuch",
        "Bhavnagar",
        "Botad",
        "Chhota Udepur",
        "Dahod",
        "Dangs (Ahwa)",
        "Devbhoomi Dwarka",
        "Gandhinagar",
        "Gir Somnath",
        "Jamnagar",
        "Junagadh",
        "Kachchh",
        "Kheda (Nadiad)",
        "Mahisagar",
        "Mehsana",
        "Morbi",
        "Narmada (Rajpipla)",
        "Navsari",
        "Panchmahal (Godhra)",
        "Patan",
        "Porbandar",
        "Rajkot",
        "Sabarkantha (Himmatnagar)",
        "Surat",
        "Surendranagar",
        "Tapi (Vyara)",
        "Vadodara",
        "Valsad"]
    res.render("index",{dist:districts});
});

router.post("/", async (req, res) => {
    const complainNumber = await generateUniqueFeedbackNumber();

    // Create a new user document
    const newUser = new user({
        district: req.body.district,
        area:req.body.area,
        poleNumber: req.body.poleNumber,
        complainHeader: req.body.complainHeader,
        complainDetails: req.body.complainDetails,
        complainNumber: complainNumber,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    // Save the user document to the database
    await newUser.save();

    res.render("thanks",{number:complainNumber});
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

