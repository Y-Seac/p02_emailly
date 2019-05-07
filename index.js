const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session"); // moduel that makes express able to use cookies. *npm install --save cookie-session
const passport = require("passport");
const keys = require("./config/keys");

require("./models/User"); /** Very important that this comes before passport require statment because passport tries to use User.js. Order of require statment is important*/
require("./services/passport"); // insures that the passport file is excuted

mongoose.connect(keys.mongoURI);

const app = express(); //Init a new express application

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //Sets how long cookie can last in browser.
    keys: [keys.cookieKey] //keeps cookie encripted.
  })
);
// tells passport that it needs to use cookies in the app
app.use(passport.initialize());
app.use(passport.session());
//3 methods above are considered middlewear. They do pre-processing for certain request before sending to in-house route handlers

require("./routes/auth")(app); //Basically called the auth.js function and passed the app variable as an param.
require("./routes/billingRoutes")(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
