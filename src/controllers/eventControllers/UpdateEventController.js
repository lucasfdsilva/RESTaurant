require('dotenv').config();
const Event = require('../../models/Event');
const User = require('../../models/User');

module.exports = {
    async updateEvent(req, res){ 
        const { eventId, eventName, gameId, location, numOfPlayers, eventDate, duration } = req.body;
        
        if (!eventId || !eventName || !gameId || !location || !numOfPlayers || !eventDate || !duration) {
            res.status(400).json({ message: "ERROR: Missing Required Information from Request" });
        }

        let eventFromDB = await Event.findOne({ _id: eventId });        
        if(!eventFromDB) return res.status(404).send({Message: 'Unable to locate an event with that ID.'});
        else{                 
            try{
                if(eventFromDB.eventName !== eventName) eventFromDB.eventName = eventName;
                if(eventFromDB.gameId !== gameId) eventFromDB.gameId = gameId;
                if(eventFromDB.location !== location) eventFromDB.location = location;
                if(eventFromDB.numOfPlayers !== numOfPlayers) eventFromDB.numOfPlayers = numOfPlayers;
                if(eventFromDB.eventDate !== eventDate) eventFromDB.eventDate = eventDate;
                if(eventFromDB.duration !== duration) eventFromDB.duration = duration;
                
                await eventFromDB.save();        
                res.status(200).json({Message: 'Event Updated Successfully!'});
            }catch{
                res.status(500).send();
            }
        }               
    }

}