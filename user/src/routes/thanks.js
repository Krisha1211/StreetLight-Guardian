const express = require("express");
const feedbackCounter = require("../models/feedbackCounter");
const user = require("../models/complains");
const router = express.Router();

router.get("/thanks", (req, res) => {
    res.render("thanks");
});

module.exports = router;
