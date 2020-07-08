const knex = require("../database/knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const awsParamStore = require( 'aws-param-store' );

//Fetching JSON Web Token Secret from AWS SSM Parameter Store
const jwtSecret = awsParamStore.getParameterSync('restaurant-jwt-token-secret', { region: 'eu-west-1' } );

module.exports = {
  async create(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) return res.status(400).json({message: "Missing Required Information from Request" });

      const userFromDB = await knex("users").where({ email: email.toLowerCase() }).first();

      if (!userFromDB) return res.status(400).json({ message: "User Not Found" });

      //if (userFromDB.verified == false) return res.status(400).json({ message: "Please verify your email before logging in" });

      //JWT Auth is built here - After checking the user credentials (authentication)
      if (!await bcrypt.compare(password, userFromDB.password)) return res.status(400).json({ message: "Password is incorrect" });
        
      const accessToken = jwt.sign(userFromDB.id, jwtSecret.Value);

      return res.status(200).json({
        message: "User Logged in succesfully",
        id: userFromDB.id,
        accessToken: accessToken,
        isAdmin: userFromDB.is_admin
      });
    
    } catch (error) {
        next(error);
    }
  },

};
