const User = require("../../models/User");

module.exports = {
  async verifyUser(req, res) {
    const reqVerificationToken = req.params.verificationToken;

    try {

      if (!reqVerificationToken) {
        res.status(400).json({ message: "ERROR: Missing Token from Request" });
      }

      let userFromDB = await User.findOne({ verificationToken: reqVerificationToken });

      if (!userFromDB) {
        return res.status(400).json({ message: "User Not Found" });
      } else {

        userFromDB.verified = true;

        await userFromDB.save();

        res.status(200).json({ message: "User email verified succesfully" });

      }
    } catch {
      res.status(500).send();
    }
  }
};
