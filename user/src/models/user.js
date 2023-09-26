const mongoose = require("mongoose");

const user = mongoose.Schema({
    electricityBoard: String,
    poleNumber: String,
    city: String,
    subStation: String,
    complaintHeader: String,
    conplaintDetails: String,
    complaintNumber: Number
});

module.exports = mongoose.model("user", user);