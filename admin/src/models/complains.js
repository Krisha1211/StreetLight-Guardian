const mongoose = require("mongoose");

const complain = mongoose.Schema({
    district: String,
    area: String,
    poleNumber: String,
    complainHeader: String,
    complainDetails: String,
    complainNumber: Number,
    latitude: String,
    longitude: String,
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("complains", complain);