import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './database.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'ayurchain_secret_key';

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role)
    return res.status(400).json({ error: 'All fields required' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
    stmt.run(name, email, hashed, role);
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    if (err.message.includes('UNIQUE'))
      return res.status(400).json({ error: 'Email already exists' });
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;