 
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { phoneNumber, password, image } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ phoneNumber, password: hashedPassword, image });
    await newUser.save();

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
