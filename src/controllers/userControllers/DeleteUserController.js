const User = require('../../models/User');
const Event = require('../../models/Event');

module.exports = {

    async deleteUser(req, res) {

        const { id } = req.body;

        try {

            if (!id) {
                res.status(400).json({ message: "ERROR: Missing User Id from Request" });
            }

            let userFromDB = await User.findOne({ _id: id });

            if (!userFromDB) {
                return res.status(400).json({ message: "User Not Found" });
            } else {
 
                for (event of userFromDB.joinedEvents) {
                    let eventFromDB = await Event.findOne({ _id: event });

                    if(eventFromDB){ 
                        await eventFromDB.participants.forEach((participantUserId, index) => {
                            if(participantUserId == id){
                                eventFromDB.participants.splice(index, 1);
                                eventFromDB.save();
                                console.log('User removed from event'); 
                            }
                        });
                    }
                }//End of loop through joined events

                await userFromDB.remove();

                res.status(200).json({ message: 'User Account deleted succesfully' });
            }
        }
        catch {
            res.status(500).send({ error: 'Could not delete the user' });
        }
    }
}