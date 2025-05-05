const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ where: { email } });

    if (!admin || !admin.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin.id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, email: admin.email, name: admin.name });
  } catch (error) {
    console.error('Admin Login Error:', error);
    res.status(500).json({ error: 'Server error during admin login' });
  }
};
