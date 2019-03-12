const passport = require("passport"); //imports passport package

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"] //the information you want from google. Check google scope list
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys"); // the res(request object) used the redirects the request to diff route
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout(); // a function given by passport..kills all cookie info associate w signed in user
    res.redirect("/");
  });
  app.get("/api/current_user", (req, res) => {
    res.send(req.user); // this says: if a ".get" request is called on the route,if user is logged returns "current user" info
    //res.send(req.session); //
  });
};
