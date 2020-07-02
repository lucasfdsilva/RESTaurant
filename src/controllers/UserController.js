const knex = require('../database/knex');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

module.exports = {

  async index(req, res, next){

    try {
      const allUsersFromDB = await knex('users');
      return res.json(allUsersFromDB); 

    } catch (error) {
      next(error);
    }

  },
  
  async view(req, res, next){
    try {
      const { id } = req.params.id

      if (!id) {
        return res.status(400).json({ message: "Missing User ID" });
      }

      const userFromDB = knex('users').where({id: id});

      if(!userFromDB) return res.status(400).json({ message: 'No User Found'});

      return res.json(userFromDB);
      
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;
      
      if (!firstName || !lastName || !email || !password) {
        res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const userFromDB = await knex('users').where({email: email})

      if (!userFromDB) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        verificationToken = crypto.randomBytes(20).toString("hex");

        let user = {
          firstName: firstName,
          lastName: lastName,
          email: email.toLowerCase(),
          password: hashedPassword,
          verificationToken: verificationToken
        };

        await User.create(user);

        //SendGrid configuration & Email send
        const msg = {
          to: `${user.email}`,
          from: "no-reply@boardgeek.ie",
          subject: "Please verify your email address - Board Geek",
          html: `<p>Please use the following token to verify your email address: http://apiboardgeek.co.uk/users/verify/${user.verificationToken}</p>`
        };

        await sgMail.send(msg).then(() => {
          console.log("SendGrid Service Email Sent");
        })
          .catch(err => {
            console.log(err);
          });

        res.status(200).json({ message: 'User Created Succesfully', verificationEmail: 'Verification Email Sent Successfully', user: user });

      } else {
        res.status(403).json({ message: "ERROR: User Already Registered", user: userFromDB });
      }

    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next){
    try {
      
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next){
    try {
      
    } catch (error) {
      next(error);
    }
  }
  
}
