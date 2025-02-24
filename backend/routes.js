const express = require('express');
const router = express.Router();
const userController = require('./postcontroller'); 
router.post('/users', userController.createUsers);       // Create a user
router.get('/users', userController.getAllUsers);       // Get all users
router.get('/users/:id', userController.getUserById);   // Get a user by ID
router.put('/users/:id', userController.updateUser);    // Update a user
router.delete('/users/:id', userController.deleteUser); // Delete a user

module.exports = router;