require('dotenv').config();
const Event = require('../../models/Event');
const User = require('../../models/User');

module.exports = {
    async deleteEvent(req, res){ 
        const { eventId } = req.body;
        
        if (!eventId) {
            res.status(400).json({ message: "ERROR: Missing Required Information from Request" });
        }

        let eventFromDB = await Event.findOne({ _id: eventId });        
        if(!eventFromDB) return res.status(404).send({Message: 'ERROR: Unable to locate the event with provided ID.'});
        else{                 
            try{  
                eventFromDB.remove();
                res.status(200).json({Message: 'Event Deleted Successfully!'});
            }catch{
                res.status(500).send({error: `Error - couldn't delete event. Please try again` 
            });
            }
        }               
    }

}