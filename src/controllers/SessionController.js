require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    try {

    if (!email || !password) {
      res.status(400).json({ message: "ERROR: Missing Required Information from Request" });
    }

    let userFromDB = await User.findOne({ email: email.toLowerCase() });

    if (!userFromDB) {
      return res.status(400).json({ message: "User Not Found" });
    }

    if (userFromDB.verified == false){
      return res.status(400).json({ message: "Please verify your email before logging in" });
    }

      let user = {
        id: userFromDB.id,
        firstName: userFromDB.firstName,
        lastName: userFromDB.lastName,
        email: userFromDB.email,
        password: userFromDB.password
      }; //Finishes converting the User Doc received from MongoDB to an object

      if (await bcrypt.compare(password, user.password)) {
        //JWT Auth is built here - After checking the user credentials (authentication)

        const accessToken = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET);

        res.status(200).json({ message: "User Logged in succesfully", id: userFromDB.id, accessToken: accessToken });

      } else {
        res.status(400).json({ message: "Password is incorrect" });
      }
    } catch {
      res.status(500).send();
    }
  } //END of Login Function
};
