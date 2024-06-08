const User = require('../models/User');

module.exports = () => {
  const controller = {};

  controller.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  controller.createUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
      let user = new User({ username, password, email });
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  controller.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email, password });
      if (user) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  return controller;
};
