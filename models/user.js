const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  created: {
    type: Date,
    required: [true, 'Created date is required'],
    default: Date.now
  },
  isHost: {
    type: Boolean,
    default: false
    // default: Boolean.false
  },
  roundScores: [
    {
      type: Number
    }
  ]
});

module.exports = mongoose.model("User", userSchema);