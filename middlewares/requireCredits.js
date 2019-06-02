module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    //If the no user if loggedin then immeditaley breaks and sends error
    return res.status(403).send({ error: 'Not enough credits' });
  }
  next(); //Lets user move to next middlewear
};
