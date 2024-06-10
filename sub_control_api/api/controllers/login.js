const User = require('../models/User');

module.exports = () => {
    const controller = {};

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