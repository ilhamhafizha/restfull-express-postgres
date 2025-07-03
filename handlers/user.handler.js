const users = []; // Penyimpanan sementara di RAM

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  // Cek apakah email sudah terdaftar
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email sudah terdaftar' });
  }

  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);

  res.status(201).json({ message: 'Registrasi berhasil', user: newUser });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Email tidak ditemukan' });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: 'Password salah' });
  }

  res.status(200).json({ message: 'Login berhasil', user: { id: user.id, email: user.email } });
};
