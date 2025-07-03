const bcrypt = require('bcrypt');
const userModel = require('../models/users.models');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Cek email sudah ada
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.createUser(username, email, hashedPassword);

    res.status(201).json({ message: 'Registrasi berhasil', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Email tidak ditemukan' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Password salah' });

    res.status(200).json({ message: 'Login berhasil', user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
