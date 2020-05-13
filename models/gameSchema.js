const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameTitle: {
    type: String,
    required: [true, 'Username is required']
  },
  created: {
    type: Date,
    required: [true, 'Created date is required'],
    default: Date.now
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = mongoose.model("Game", gameSchema);