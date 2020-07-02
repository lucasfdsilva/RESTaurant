require('dotenv').config();
const Event = require('../../models/Event');
const User = require('../../models/User');

module.exports = {
  async getEventByHostId(req, res){
    const { hostId } = req.params;

    let eventFromDB = await Event.find({ hostId: hostId }).lean();

    //Adds an array to store the users profile information
    eventFromDB.forEach(function (element) {
      element.participantsProfiles = [];
    });

    try {
      if (eventFromDB.length > 0){

        for(event of eventFromDB){          
          for (participant of event.participants) {
            let user = await User.findOne({ _id: participant});
  
            if(user){ 
                event.participantsProfiles.push(user);
                console.log('Found user, adding to local users array'); 
            }
          }//End of loop through joined events
        }
      }
      
      if (eventFromDB.length == 0){
        return res.status(404).send({ Message: "Unable to locate an event with provided host ID." });
      }  
      
      res.status(200).json({message: eventFromDB});

    } catch(e) {
        res.status(500).send(e);
      }
    }
};