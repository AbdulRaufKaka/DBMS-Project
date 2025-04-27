const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findOne({ where: { email } });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ email, password: hashedPassword });

        res.status(201).json({ message: 'Registration Successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration Failed' });
    }
};
