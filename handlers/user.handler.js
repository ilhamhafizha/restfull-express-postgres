exports.register = (req, res) => {
  const { username, email, password } = req.body;
  // Di sini kamu bisa tambahkan logic hash password
  res.status(201).json({ message: 'User registered successfully', user: { username, email } });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  // Cek login dummy
  res.status(200).json({ message: 'Login success', token: 'dummy_token' });
};
