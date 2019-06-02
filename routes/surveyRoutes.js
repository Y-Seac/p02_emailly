const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); //required it this way because of testing??

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thank you for voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    //order of middleweares is important.
    const { title, subject, body, recipients } = req.body;

    //creates new Survey instance
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })), //.map(email => {return { email: email }}
      _user: req.user.id,
      dateSent: Date.now()
    });

    //attempt to send and create email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      //Email sent?
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
