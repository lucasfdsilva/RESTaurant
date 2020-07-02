require("dotenv").config();
const Event = require("../../models/Event");
const User = require("../../models/User");

module.exports = {
  async getEventById(req, res) {
    const { eventId } = req.params;

    let eventFromDB = await Event.findOne({ _id: eventId }).lean();

    if (!eventFromDB) {
      return res
        .status(404)
        .send({
          Message: "Unable to locate an event with provided ID."
        });
    }

    //Adds an array to store the users profile information

    try {
      if (eventFromDB) {
        eventFromDB.participantsProfiles = [];
          for (participant of eventFromDB.participants) {
            let user = await User.findOne({ _id: participant });

            if (user) {
              eventFromDB.participantsProfiles.push(user);
              console.log("Found user, adding to local users array");
            }
          } //End of loop through joined events
        }

      res.status(200).json({ message: eventFromDB });
    } catch (e) {
      res.status(500).send(e);
    }
  }
};
