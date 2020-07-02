const knex = require("../database/knex");

module.exports = {
  async index(req, res, next) {
    try {
      const allMenuItems = await knex("menu_items");
      return res.json(allMenuItems);
    } catch (error) {
        next(error);
    }
  },

  async view(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Missing Menu Item ID" });
      }

      const menuItemFromDB = await knex("menu_items").where({ id: id }).first();

      if (!menuItemFromDB) return res.status(400).json({ message: "No Menu Item Found" });

      return res.status(200).json({ item : menuItemFromDB });

    } catch (error) {
        next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { name, price, description, stock } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const menuItemFromDB = await knex("menu_items").where({ name: name }).first();

      if(menuItemFromDB) return res.status(400).json({ message: "Menu Item already exists" });

      const newMenuItem = await knex('menu_items').insert({
        name: name,
        price: price,
        description: description,
        stock: stock
      });

      return res.status(201).json({ message: "Menu Item Created Succesfully" });

    } catch (error) {
        next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id, name, price, description, stock } = req.body;

      if (!id || !name) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const menuItemFromDB = await knex("menu_items").where({ id: id }).first();

      if(!menuItemFromDB) return res.status(400).json({ message: "No Menu Item Found" });

      const updatedMenuItem = await knex('menu_items').where({ id: id }).update({
        name: name,
        price: price,
        description: description,
        stock: stock
      });

      return res.status(200).json({ message: 'Menu Item updated succesfully'});

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

      const menuItemFromDB = await knex("menu_items").where({ id: id }).first();

      if(!menuItemFromDB) return res.status(400).json({ message: "No Menu Item Found" });

      const deletedMenuItem = await knex('menu_items').where({ id: id}).del();

      return res.status(200).json({ message: 'Menu Item deleted succesfully' });

    } catch (error) {
        next(error);
    }
  },
};