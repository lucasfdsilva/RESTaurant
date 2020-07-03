const knex = require("../database/knex");

module.exports = {
  async index(req, res, next) {
    try {
      const allBookings = await knex("bookings");
      return res.json(allBookings);
    } catch (error) {
        next(error);
    }
  },

  async view(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Missing Booking ID" });
      }

      const bookingFromDB = await knex("bookings").where({ id: id }).first();

      if (!bookingFromDB) return res.status(400).json({ message: "No Booking Found" });

      return res.status(200).json({ booking : bookingFromDB });

    } catch (error) {
        next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { userID, tableID, slotID, date } = req.body;

      if (!userID || !tableID || !slotID || !date) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      //const bookingFromDB = await knex("bookings").where({ user_id: userID }).first();
      //if(bookingFromDB) return res.status(400).json({ message: "There's 1 active booking for this user already" });

      const newBooking = await knex('bookings').insert({
        user_id: userID,
        table_id: tableID,
        slot_id: slotID,
        date: date
      });

      return res.status(201).json({ message: "Booking Registered Succesfully" });

    } catch (error) {
        next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id, userID, tableID, slotID, date } = req.body;

      if (!id || !userID || !tableID || !slotID || !date) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const bookingFromDB = await knex("bookings").where({ id: id }).first();

      if(!bookingFromDB) return res.status(400).json({ message: "No Booking Found" });

      const updatedBooking = await knex('bookings').where({ id: id }).update({
        user_id: userID,
        table_id: tableID,
        slot_id: slotID,
        date: date
      });

      return res.status(200).json({ message: 'Booking updated succesfully' });

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

      const bookingFromDB = await knex("bookings").where({ id: id }).first();

      if(!bookingFromDB) return res.status(400).json({ message: "No Booking Found" });

      const deletedBooking = await knex('bookings').where({ id: id}).del();

      return res.status(200).json({ message: 'Booking deleted succesfully' });

    } catch (error) {
        next(error);
    }
  },
};