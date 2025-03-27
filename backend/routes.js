const express = require('express');
const { body, validationResult } = require('express-validator');
const Story = require('./models/Story');

const router = express.Router();

// Validation middleware
const validateStory = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('author').notEmpty().withMessage('Author is required'),
];

// Get all stories
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving stories' });
  }
});

// Create a new story with validation
router.post('/stories', validateStory, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, author } = req.body;
  try {
    const newStory = new Story({ title, content, author });
    await newStory.save();
    res.status(201).json(newStory);
  } catch (err) {
    res.status(500).json({ message: 'Error creating story' });
  }
});

// Update a story with validation
router.put('/stories/:id', validateStory, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    const updatedStory = await Story.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true }
    );
    if (!updatedStory) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(updatedStory);
  } catch (err) {
    res.status(500).json({ message: 'Error updating story' });
  }
});

// Delete a story
router.delete('/stories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStory = await Story.findByIdAndDelete(id);
    if (!deletedStory) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json({ message: 'Story deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting story' });
  }
});

module.exports = router;
