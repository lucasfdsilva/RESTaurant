const knex = require("../database/knex");

module.exports = {
  async index(req, res, next) {
    try {
      const allTables = await knex("tables");
      return res.json(allTables);
    } catch (error) {
        next(error);
    }
  },

  async view(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Missing Table ID" });
      }

      const tableFromDB = await knex("tables").where({ id: id }).first();

      if (!tableFromDB) return res.status(400).json({ message: "No Table Found" });

      return res.status(200).json({ table : tableFromDB });

    } catch (error) {
        next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { name, maxCapacity } = req.body;

      if (!name || !maxCapacity) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const tableFromDB = await knex("tables").where({ name: name }).first();

      if(tableFromDB) return res.status(400).json({ message: "Table is already registered" });

      const newTable = await knex('tables').insert({
        name: name,
        max_capacity: maxCapacity
      });

      return res.status(201).json({ message: "Table Registered Succesfully" });

    } catch (error) {
        next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id, name, maxCapacity } = req.body;

      if (!id || !name || !maxCapacity) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const tableFromDB = await knex("tables").where({ id: id }).first();

      if(!tableFromDB) return res.status(400).json({ message: "No Table Found" });

      const updatedTable = await knex('tables').where({ id: id }).update({
        name: name,
        max_capacity: maxCapacity
      });

      return res.status(200).json({ message: 'Table updated succesfully'});

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

      const tableFromDB = await knex("tables").where({ id: id }).first();

      if(!tableFromDB) return res.status(400).json({ message: "No Table Found" });

      const deletedTable = await knex('tables').where({ id: id}).del();

      return res.status(200).json({ message: 'Table deleted succesfully' });

    } catch (error) {
        next(error);
    }
  },
};