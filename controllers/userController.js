const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    register: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = new User({ username, password });
            await user.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user || !await bcrypt.compare(password, user.password)) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = userController;
