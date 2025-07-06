const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  text: { type: String, required: true },
  tag: { type: String },
  media: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Story", storySchema);
