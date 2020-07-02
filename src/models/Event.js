const User = require('./User');
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventName: {
    type: String,
    required: true
  },
  gameId: {
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  eventDate:{
    type: Date,
    default: Date.now,
    required: true
  },
  numOfPlayers:{
    type: Number,
    required: true
  },
  duration:{
      type: Number,
      required: true
  },
  participants:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;