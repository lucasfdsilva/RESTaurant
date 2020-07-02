require('dotenv').config();
const Event = require('../../models/Event');
const User = require('../../models/User');

module.exports = {

  async leaveEvent(req, res){

    const { eventId, userId } = req.body;

    try{

      //Check for missing data on request
      if(!eventId || !userId){
        res.status(400).json({ message: "Error - Missing Required Information from Request"});
      }

      //retrieves user & event from DB
      let eventFromDB = await Event.findOne({ _id: eventId });
      let userFromDB = await User.findOne({ _id: userId });

      //Check if Event exists
      if(!eventFromDB){
        res.status(400).json({ message: "Error - Can't find Event with provided ID" });
      }

      //Check if User exists
      if(!userFromDB){
        res.status(400).json({ message: "Error - Can't find User with provided ID" });
      }

      //Checks if user is already registered for event
      await eventFromDB.participants.forEach((participant) => {
        if(participant == userId){

          eventFromDB.participants.splice(participant, 1);
          userFromDB.joinedEvents.splice(eventId, 1);
          eventFromDB.save();
          userFromDB.save();

          res.status(200).json({ message: "User left event successfully"});
        }
      });

      res.status(400).json({ message: "Error - User is not registered in this event" });


    }catch(err){
      res.status(500).json({ message: "Error - could not leave event"});
    }

  }
};