const User = require("../../models/User");

module.exports = {
  async updateUser(req, res) {
    const { id, firstName, lastName, email } = req.body;

    try {

      if (!id || !firstName || !lastName || !email) {
        res.status(400).json({ message: "ERROR: Missing Required Information from Request" });
      }

      let userFromDB = await User.findOne({ _id: id });

      if (!userFromDB) {
        return res.status(400).json({ message: "User Not Found" });
      } else {

        if (userFromDB.firstName !== firstName) {
          userFromDB.firstName = firstName;
        }

        if (userFromDB.lastName !== lastName) {
          userFromDB.lastName = lastName;
        }

        if (userFromDB.email !== email) {
          userFromDB.email = email;
        }

        await userFromDB.save();

        res.status(200).json({ message: 'User profile Updated Succesfully' });

      }
    } catch {
      res.status(500).send();
    }
  }
};
