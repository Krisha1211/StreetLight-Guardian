const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const dashboardRoute = require("./routes/dashboard")
const loginRoute = require("./routes/login")
const createAdminRoute = require("./routes/createAdmin")
const Admin = require("./models/admins")
const viewComplainRoute = require("./routes/viewComplains")
const verifyComplainRoute = require("./routes/verifyComplain")
const mapRoute = require("./routes/map")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
 
app.use(
    session({
        secret: 'my-secreysfa-mjiadfsn',
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'hbs');
app.set('views', 'admin/views');
hbs.registerPartials('admin/views/partials');

passport.use(Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.use('', loginRoute)
app.use('', createAdminRoute)
app.use('', dashboardRoute)
app.use('', viewComplainRoute)
app.use('', verifyComplainRoute)
app.use('',mapRoute)

hbs.registerHelper('eq', function (arg1, arg2) {
    return (arg1 == arg2) ? true : false;
});

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Street-light-Guardian');
    console.log('Database connected');
}

app.listen(4000, () => {
    console.log('Server started on port 4000');
});
