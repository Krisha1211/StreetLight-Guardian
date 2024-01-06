const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = mongoose.Schema({
    // Existing fields
    name: String,
    password: String,
    email: String,
    phoneNumber:String
});

adminSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model("Admins", adminSchema);