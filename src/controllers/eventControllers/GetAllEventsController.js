require('dotenv').config();
const Event = require('../../models/Event');

module.exports = {
    async getEvents(req, res){
        const collection = await Event.find();         
        res.status(200).json({ message: collection });;
    }
}