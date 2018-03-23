const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // where we put logic to handle the token
    // reach out to stripe api to get money
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 Dragon Credits',
      source: req.body.id,
    });
    console.log(req.user);
    req.user.credits += 5;
    const user = await req.user.save(); // save user
    res.send(user);
    console.log(user);
  });
};
