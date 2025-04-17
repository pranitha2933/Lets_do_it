const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  image: String,
});

module.exports = mongoose.model("Recruiter", recruiterSchema);
