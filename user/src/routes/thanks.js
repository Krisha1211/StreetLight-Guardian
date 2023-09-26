const express = require("express");
const feedbackCounter = require("../models/feedbackCounter");
const user = require("../models/user");
const hbs = require("hbs");
const router = express.Router();

router.get("/thanks", (req, res) => {
    res.render("mitul");
});

module.exports = router;
