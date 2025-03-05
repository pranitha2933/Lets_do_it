const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  country: String,
  date: String,
  time: String,
  category: String,
  image: String,
  price: String
});

module.exports = mongoose.model('Event', EventSchema);