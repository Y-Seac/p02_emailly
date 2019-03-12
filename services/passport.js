const passport = require("passport"); //imports passport npm module
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys"); //two dotes goes into two directories

const User = mongoose.model("users"); //Pulls User collection from DB. This method of importing another file is necessary ecause in test dev it will throw a ‘model already exist’ error.

//Gets a token to stuff in a Cookie which tells passport when user is still logged in or not
passport.serializeUser((user, done) => {
  done(null, user.id); //access the current user and get there id (database id) to use as a token/cookie so the browser can confirm if user is still logged in.
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    //uses the returned user from findbyId and calls done on it. (user =>)*function says user eqls what ever comes after arrow.
    done(null, user);
  });
});

//Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },

    //gets identifying info and creates a new user in database.
    //returns first user with that id the DB if a user with the passed googleID exist. else is false
    // does not return User object but returns a promise(?).
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });

      //Already have user in DB so does not create.
      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleID: profile.id }).save(); //when Oauth redirects back to server this creates a User in DB. The .save method saves User to the database(moves it from mongoose into mongodb)
      done(null, user);
    }
  )
);
