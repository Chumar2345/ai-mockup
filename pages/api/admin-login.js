// pages/api/auth.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'; // Replace with your actual secret

export default function handler(req, res) {
  console.log(`Method: ${req.method}`); // Log method
  console.log(`Body: ${JSON.stringify(req.body)}`); // Log body
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Example credentials validation
    if (email === 'admin@example.com' && password === 'password123') {
      const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, {
        expiresIn: '1h',
      });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    // Return a 405 error for unsupported HTTP methods
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
