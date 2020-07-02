require('dotenv').config();
const Event = require('../../models/Event');
const User = require('../../models/User');

module.exports = {
  async signUpToEvent(req, res){

    const { eventId, userId } = req.body;
    let alreadyJoined = false;

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

      //Checks if numbers of player is already at maximum
      if(eventFromDB.participants.length >= eventFromDB.numOfPlayers){
        res.status(400).json({ message: "Error - Number Maximum of players reached" });
      }

      //Checks if user is already registered for event
      eventFromDB.participants.forEach((participant) => {
        if(participant == userId){
          alreadyJoined = true
        }
      });

      if(alreadyJoined == true){
        res.status(400).json({ message: "Error - User already joined the event"});
      }else{
        //Adds user to participants array
        eventFromDB.participants.push(userFromDB);
        userFromDB.joinedEvents.push(eventFromDB);
        await eventFromDB.save();
        await userFromDB.save();

        res.status(200).json({ message: "User Joined Event Succesfully" });
      }

    }catch(e){
      res.status(500).json({ message: "Error - could not join event"});
    }

  }
};