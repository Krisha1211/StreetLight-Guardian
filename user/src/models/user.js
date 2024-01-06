const mongoose = require("mongoose");

const user = mongoose.Schema({
    electricityBoard: String,
    poleNumber: String,
    city: String,
    subStation: String,
    complaintHeader: String,
    conplaintDetails: String,
    complaintNumber: Number,
    latitude: String,
    longitude: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", user);