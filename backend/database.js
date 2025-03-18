const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.error(`Database connection failed: ${err.message}`);
      process.exit(1);  
    });
};

const getConnection = () => {
  if (mongoose.connection.readyState === 1) {
    return "MongoDB is connected!";
  } else {
    return "MongoDB is not connected.";
  }
};

const updateStoryVotes = async (storyId, newVotes) => {
  try {
    const updatedStory = await Story.findByIdAndUpdate(
      storyId,
      { votes: newVotes },  
      { new: true }  
    );

    if (updatedStory) {
      console.log('Story updated:', updatedStory);
      return updatedStory;
    } else {
      console.log('Story not found');
      return null;
    }
  } catch (err) {
    console.error('Error updating story:', err.message);
    return null;
  }
};


module.exports = { connectDatabase, getConnection, updateStoryVotes };
