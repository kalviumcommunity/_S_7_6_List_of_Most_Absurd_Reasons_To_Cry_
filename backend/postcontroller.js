const User = require('./postschema'); // Import User Schema

// ✅ Create a new user
exports.createUsers = async (req, res) => {
    try {
      const users = req.body; // Expecting an array of users
      if (!Array.isArray(users) || users.length === 0) {
        return res.status(400).json({ message: "Invalid input: Expecting an array of users" });
      }
      
      const newUsers = await User.insertMany(users);
      res.status(201).json({ message: 'Users created successfully!', users: newUsers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// ✅ Read (Get all users)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Read (Get a single user by ID)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update user details
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User updated successfully!', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};