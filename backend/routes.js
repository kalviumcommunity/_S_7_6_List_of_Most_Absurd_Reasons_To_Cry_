
const express = require('express');
const { updateStoryVotes } = require('./database'); 
const Entity = require('./models/Entity');
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


router.post('/entities', async (req, res) => {
  const { title, content, author } = req.body;
  const newEntity = new Entity({ title, content, author });

  try {
    await newEntity.save();
    res.status(201).json(newEntity);
  } catch (err) {
    res.status(500).json({ message: 'Error creating entity' });
  }
});


router.get('/entities', async (req, res) => {
  try {
    const entities = await Entity.find();
    res.json(entities);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving entities' });
  }
});

module.exports = router;  
