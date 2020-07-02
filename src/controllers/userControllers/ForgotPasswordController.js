require('dotenv').config();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {

      if (!email) {
        res.status(400).json({ message: "ERROR: Missing Required Information from Request" });
      }

      let userFromDB = await User.findOne({ email: email.toLowerCase() });

      //Checks if user exists in the Database
      if (!userFromDB) {
        return res.status(400).send({ message: 'User Not Found' });
      } else {
        const token = crypto.randomBytes(20).toString('hex'); //creates a token using crypto to generate random 20 hex characters

        //Creates an instance of date to be used as time limit for the token created above
        const now = new Date();
        now.setHours(now.getHours() + 1);

        //Updates the user found using the email address with the token and token expiration time
        await User.findByIdAndUpdate(userFromDB._id, {
          $set: {
            passwordResetToken: token,
            passwordResetExpires: now
          }
        }).then(console.log('Updated user with Token and expiry date'))
        .catch((err) => {
          console.log(err)
        });

        //SendGrid configuration & Email send
        const msg = {
            to: `${ email }`,
            from: 'no-reply@boardgeek.ie',
            subject: 'Password Reset - EmTeam',
            html: `<p>Did you forget your password? Use this token to reset it: ${ token }</p>`
          };
        
        sgMail.send(msg)
          .then(() => {
            console.log('SendGrid Service Email Sent')
            res.status(200).json({ message: 'Reset Password Email Sent Successfully', token: token, expiresAt: now });
          }).catch((err) => {
            console.log(err);
            res.status(400).send({ message: 'Error on sending Password Reset Email '});
        });

      }
    } catch (err) {
      res.status(400).send({ message: 'Error on forgot password, try again' });
    }
  }
};
