const User = require('../../models/User');
const Event = require('../../models/Event');
require('dotenv').config();

module.exports = {

  async viewUser(req, res) {
    const { id } = req.params;

    try {

      if (!id) {
        res.status(400).json({ message: "ERROR: Missing User id from Request" });
      }

      let userFromDB = await User.findOne({ _id: id }).lean();
      userFromDB.joinedEventsProfiles = [];

      if (!userFromDB) {
        return res.status(400).json({ message: "User Not Found" });
      } else {

        if (userFromDB.joinedEvents.length > 0){        
          for (joinedEvent of userFromDB.joinedEvents) {
            let event = await Event.findOne({ _id: joinedEvent});
            console.log(event); 
  
            if(event){ 
                userFromDB.joinedEventsProfiles.push(event);
            }
          }//End of loop through joined events
        }

        res.status(200).json({ message: userFromDB });

      }
    } catch {
      res.status(500).send();
    }
  }
};