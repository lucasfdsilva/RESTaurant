require('dotenv').config();
const Event = require('../../models/Event');
const User = require('../../models/User');

module.exports = {
  async getEventIsParticipating(req, res){
    const { userId } = req.params;

    const eventFromDB = await Event.find({
      participants: userId
    }).lean();

    //Adds an array to store the users profile information
    eventFromDB.forEach(function(element) {
      element.participantsProfiles = [];
    });

    try {
      if (eventFromDB.length > 0) {
        for (event of eventFromDB) {
          for (participant of event.participants) {
            let user = await User.findOne({ _id: participant });

            if (user) {
              event.participantsProfiles.push(user);
              console.log("Found user, adding to local users array");
            }
          } //End of loop through joined events
        }
      }

      if (eventFromDB.length == 0) {
        return res.status(404).send({ Message: "Unable to locate an event that the user is participating." });
      }

      res.status(200).json({ message: eventFromDB });
      
    } catch (e) {
      res.status(500).send(e);
    }



  }
};