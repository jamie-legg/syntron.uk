import express, { Request, Response } from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import { armaAuth } from "./arma";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

// PostgreSQL connection configuration
const prisma = new PrismaClient();

// Middleware to log requests
app.use((req: Request, res: Response, next: Function) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

app.post("/auth/", async (req: Request, res: Response) => {
  const { id, name, email, image } = req.body;

  // Check if user already exists in the database by ID or email
  const existingUser = await prisma.user.findFirst({
    where: {
      email
    }});

  if (existingUser) {
    // Update user details
    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: { name, email, imageUrl: image },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: updatedUser.id, email: updatedUser.email },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    return res.json({ token });
  }

  // Create new user
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      imageUrl: image,
    },
  });

  // Generate JWT token
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    "your_secret_key",
    { expiresIn: "1h" }
  );

  res.json({ token });

});

app.get("/armaauth/0.1", armaAuth);

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
