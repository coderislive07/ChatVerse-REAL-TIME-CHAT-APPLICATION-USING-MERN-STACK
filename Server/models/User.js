const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  profileImage: { type: String },
  profile: { type: Boolean, default: false },

});

const User = mongoose.model('User', userSchema);
module.exports = User;
