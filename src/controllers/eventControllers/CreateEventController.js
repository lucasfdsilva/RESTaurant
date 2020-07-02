require('dotenv').config();
const Event = require('../../models/Event');
const User = require('../../models/User');

module.exports = {
    async createEvent(req, res){ 
        
        //Get the request body
        const { hostId, eventName, gameId, location, numOfPlayers, eventDate, duration } = req.body;

        if (!hostId || !eventName || !gameId || !location || !numOfPlayers || !eventDate || !duration) {
            res.status(400).json({ message: "ERROR: Missing Required Information from Create Event Request" });
        }

        //TEMPORARY CHECK: See if user id passed for host matches one from DB.
        let userFromDB = await User.findOne({ _id: hostId });

        //If not, return error.
        if(!userFromDB) return res.status(404).json({ Message: `Can't find user in database.` });

        //If successful, attempt to create event with passed params.
        else{
            try{
                let event = {
                    hostId: userFromDB,
                    eventName: eventName,
                    gameId: gameId,
                    location: location,              
                    numOfPlayers: numOfPlayers,
                    eventDate: eventDate,
                    duration: duration,
                    participants: hostId
                };
                eventFromDB = await Event.create(event).then(console.log('event created')).catch(console.log('event not created'));
                await userFromDB.joinedEvents.push(eventFromDB);
                userFromDB.save();

                res.status(200).json({Message: 'Event Created Successfully!'});
                console.log("foi")
            }catch(e){
                res.status(500).json({Message: `Error - couldn't create event. Please try again`});
                console.log(e)
            }
        }
    }

}