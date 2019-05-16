const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // moduel that makes express able to use cookies. *npm install --save cookie-session
const passport = require('passport');
const bodyParser = require('body-parser'); //middlewear. Express doesn't automatically parse payload(info) when doing post req.
const keys = require('./config/keys');

require('./models/User'); /** Very important that this comes before passport require statment because passport tries to use User.js. Order of require statment is important*/
require('./services/passport'); // insures that the passport file is excuted

mongoose.connect(keys.mongoURI);

//EXPRESS MIDDLEWEAR
//They do pre-processing for certain request before sending to in-house route handlers
const app = express(); //Init a new express application

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //Sets how long cookie can last in browser.
    keys: [keys.cookieKey] //keeps cookie encripted.
  })
);
// tells passport that it needs to use cookies in the app
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth')(app); //Basically called the auth.js function and passed the app variable as an param.
require('./routes/billingRoutes')(app);

//Conditional that signals express that its in production.
if (process.env.NODE_ENV === 'production') {
  //Express will give/make available the production assets i.e main.js & main.css
  app.use(express.static('client/build')); //tells react to look in in client/build directory to see if assets are there.

  //Express will return the index.js file if specific route isnt reconized(not defined in /routes) gets routes.
  //Catch all case if express cant find what were looking for in any of the directorys above.
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT; //|| 5000;
app.listen(PORT);
