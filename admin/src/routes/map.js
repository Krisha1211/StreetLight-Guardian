const express = require("express");
const router = express.Router();
const Complains = require("../models/complains");
const connectEnsureLogin = require('connect-ensure-login');

router.get("/map", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
    try {
        // Fetch complaints with status 'Pending' or 'Under Process'
        const complains = await Complains.find({}, 'latitude longitude -_id'); // Select only latitude and longitude fields

        console.log(complains);
        // Extracting coordinates array from the result
        const coordinatesArray = complains.map(item => [parseFloat(item.latitude), parseFloat(item.longitude)]);
        const coordinatesArrayString = JSON.stringify(coordinatesArray);
        console.log(coordinatesArrayString);
        res.render("map", { coordinatesArrayString });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
