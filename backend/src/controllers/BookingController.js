const knex = require("../database/knex");

module.exports = {
  async index(req, res, next) {
    try {
      const { userID } = req.query;

      let allBookings = [];

      if(!userID){
        allBookings = await knex("bookings");
        return res.status(200).json(allBookings);
      }

      allBookings = await knex("bookings").where({ user_id: userID });
      return res.status(200).json(allBookings);
      
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
      const { userID, slotID, date, numberOfPeople, startTime, duration } = req.body;

      if (!userID || !slotID || !date || !numberOfPeople || !startTime || !duration) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      const newBooking = await knex('bookings').insert({
        user_id: userID,
        slot_id: slotID,
        date: date,
        number_of_people: numberOfPeople,
        start_time: startTime,
        duration: duration 
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

  async checkSlotsAvailability(req, res, next){
    try {
      const { date, numberOfPeople } = req.query;
      var availableSlots = [];

      if (!date || !numberOfPeople) {
        return res.status(400).json({ message: "Missing Required Information from Request" });
      }

      var convertedDate = new Date(date);
      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      var dateWeekDay = weekday[convertedDate.getDay()];
      
      const allRegisteredSlotsWeekDayTrueRaw = await knex.schema.raw(`SELECT id, start_time, duration, max_capacity from slots WHERE ${dateWeekDay} = true`);
      const existingBookingsOnDate = await knex("bookings").where({ date: date });

      //Get all slots that are registered for that week day
      var allRegisteredSlotsWeekDayTrueClean = [];
      for(const slot of allRegisteredSlotsWeekDayTrueRaw[0]){
        allRegisteredSlotsWeekDayTrueClean.push({ "slot_id": slot.id, "start_time": slot.start_time, "duration": slot.duration ,"max_capacity": slot.max_capacity });
      }

      //Get all slots that already have bookings on that day
      var slotsInBookingsOnDate = [];
      for(const booking of existingBookingsOnDate){
        var slotAlreadyInArray=false
        
        for(const slot of slotsInBookingsOnDate){
          if(slot.slotID == booking.slot_id){
            slot.people = slot.people + booking.number_of_people;
            slotAlreadyInArray = true;
          }
        }

        if(!slotAlreadyInArray) {
          slotsInBookingsOnDate.push({"slotID": booking.slot_id, "people": booking.number_of_people});
        }
      }

      //Get all available slots after comparing max_capacity with existing bookings + number of people requesting the new booking
      var availableSlots = [];
      for(const slot of allRegisteredSlotsWeekDayTrueClean){
        let slotCapacity = slot.max_capacity;

        for(const bookedSlot of slotsInBookingsOnDate){
          if(bookedSlot.slotID == slot.slot_id){
            slotCapacity = slot.max_capacity - bookedSlot.people;
          }
        }

        if(slotCapacity >= numberOfPeople){
          availableSlots.push({"slot_id": slot.slot_id, "start_time": slot.start_time, "duration": slot.duration, "max_capacity": slot.max_capacity, "available_capacity": slotCapacity});
        }
      }
  
      return res.status(200).json({ availableSlots });
      
    } catch (error) {
        next(error);
    }
  }
};