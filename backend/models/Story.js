const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
