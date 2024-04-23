import express, { Request, Response } from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";

const app = express();
app.use(express.json());

// PostgreSQL connection configuration
const pool = new Pool({
  user: "your_username",
  host: "localhost",
  database: "your_database",
  password: "your_password",
  port: 5432,
});
// Middleware to log requests
app.use((req: Request, res: Response, next: Function) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// User registration endpoint
app.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User login endpoint
app.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.rows[0].id }, "your_secret_key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const allowedMethods = ["md5"];

app.get("/armaauth/0.1", async (req: Request, res: Response) => {
  // get query param
  const query = req.query.query;
  if (!query) {
    const requestInfo = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    };

    res.status(400).json(requestInfo);
  }

  switch (query) {
    case "methods":
      res.send("methods " + allowedMethods.join(" "));
      break;

    case "params":
      const method = req.query.method;
      if (!method) {
        res.status(400).json({ error: "Missing method query param" });
      }
      if(allowedMethods.includes(method as string)){
        res.send(`prefix\nsuffix`);
      } else {
        res.status(400).json({ error: "Invalid method query param" });
      }
      break;
    case "version":
      res.status(200).send("0.1");
      break;
    case "check":
      res.status(200).send("PASSWORD_OK");
      break;
    case "ping":
      res.json({ message: "pong" });
      break;
    default:
      res.status(400).json({ error: "Invalid query param" });
  }

  console.log("GET /armaauth/0.1");
});

app.post("/armaauth/0.1", async (req: Request, res: Response) => {
  console.log("POST /armaauth/0.1");
  const requestInfo = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  };

  res.json(requestInfo);
});

app.get("/", (req: Request, res: Response) => {
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
app.get("/protected", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "Access granted to protected route" });
});

// Middleware to authenticate JWT token
function authenticateToken(req: Request, res: Response, next: Function) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, "your_secret_key", (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    (req as any).user = user;
    next();
  });
}

const CLIENT_ID = 'YOUR_DISCORD_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_DISCORD_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback';

app.get('/auth/discord', (req: Request, res: Response) => {
  const redirectUri = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20email`;
  res.redirect(redirectUri);
});

app.get('/auth/callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  try {
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { data } = tokenResponse;
    res.cookie('access_token', data.access_token, { httpOnly: true });
    res.redirect('http://localhost:3000/profile');
  } catch (error) {
    res.status(500).send('Authentication failed');
  }
});


// Start the server
app.listen(3300, () => {
  console.log("Server is running on port 3300");
});
