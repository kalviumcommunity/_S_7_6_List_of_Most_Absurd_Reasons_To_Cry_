const express = require('express');
const { updateStoryVotes } = require('./database'); 
const router = express.Router();


router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving stories' });
  }
});


router.put('/stories/:id', async (req, res) => {
  const { id } = req.params;
  const { votes } = req.body;

  const updatedStory = await updateStoryVotes(id, votes);
  if (updatedStory) {
    res.json(updatedStory);
  } else {
    res.status(404).json({ message: 'Story not found' });
  }
});

module.exports = router;
