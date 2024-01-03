const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const hbs = require("hbs");
const User = require("./models/user"); // Import your User model
const FeedbackCounter = require("./models/feedbackCounter"); // Import the counter model
const complainRoute = require("./routes/complain");
const thanksRoute = require("./routes/thanks");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use("", complainRoute);
app.use("", thanksRoute);

// hbs engine
app.set("view engine", "hbs");
app.set("views", "user/views");
hbs.registerPartials("user/views/partials");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Street-light-Guardian");
  console.log("Database connected");
}

app.listen(5000, () => {
  console.log("server started at 5000");
})

