module.exports = (req, res, next) => {
  if (!req.user) {
    //If the no user if loggedin then immeditaley breaks and sends error
    return res.status(401).send({ error: 'Log in first' });
  }
  next(); //Lets user move to next middlewear
};
