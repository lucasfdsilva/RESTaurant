const knex = require("../database/knex");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

module.exports = {
  async index(req, res, next) {
    try {
      const message = 'test message';
      const allUsersFromDB = await knex("users");
      return res.json(allUsersFromDB, message);
    } catch (error) {
        next(error);
    }
  },

  async view(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Missing User ID" });
      }

      const userFromDB = await knex("users").where({ id: id }).first();

      console.log(userFromDB);

      if (!userFromDB) return res.status(400).json({ message: "No User Found" });

      return res.status(200).json({ user: userFromDB });

    } catch (error) {
        next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { firstName, lastName, email, password, isAdmin } = req.body;

      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const userFromDB = await knex("users").where({ email: email }).first();

      if(userFromDB) return res.status(400).json({ message: "Email address already registered" });

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      verificationToken = crypto.randomBytes(20).toString("hex");

      const newUser = await knex('users').insert({
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        is_admin: isAdmin,
        verification_token: verificationToken,
      });

      return res.status(201).json({ message: "User Created Succesfully", newUserID: newUser });

    } catch (error) {
        next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id, firstName, lastName, email, isAdmin } = req.body;

      if (!id || !firstName || !lastName || !email ) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const userFromDB = await knex("users").where({ id: id }).first();

      if(!userFromDB) return res.status(400).json({ message: "No User Found" });

      const updatedUser = await knex('users').where({ id: id }).update({
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase(),
        is_admin: isAdmin
      });

      return res.status(200).json({ message: 'User updated succesfully'});

    } catch (error) {
        next(error);
    }
  },

  async delete(req, res, next) {
    try {

      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const userFromDB = await knex("users").where({ id: id }).first();

      if(!userFromDB) return res.status(400).json({ message: "No User Found" });

      const deletedUser = await knex('users').where({ id: id}).del();

      return res.status(200).json({ message: 'User deleted succesfully' });

    } catch (error) {
        next(error);
    }
  },
};
