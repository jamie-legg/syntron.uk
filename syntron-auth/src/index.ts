import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// User registration endpoint
app.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login endpoint
app.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.rows[0].id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req: Request, res: Response) => {
  // get info from the request and show it in the response

  const requestInfo = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  };

  res.json(requestInfo);
});

// Protected route example
app.get('/protected', authenticateToken, (req: Request, res: Response) => {
  res.json({ message: 'Access granted to protected route' });
});

// Middleware to authenticate JWT token
function authenticateToken(req: Request, res: Response, next: Function) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, 'your_secret_key', (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    (req as any).user = user;
    next();
  });
}

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});