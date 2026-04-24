import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'ayurchain_secret_key';

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: `Access denied. Required role: ${roles.join(' or ')}` });
    next();
  };
}