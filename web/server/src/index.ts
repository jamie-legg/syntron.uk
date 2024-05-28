import express, { Request, Response } from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import { armaAuth } from "./arma";
import { PrismaClient } from "@prisma/client";
import Docker from 'dockerode';
import { RoundFactory } from "./factories/RoundFactory";
import { MatchFactory } from "./factories/MatchFactory";
import { config } from "dotenv";

// Initialize the Dockerode instance
const docker = new Docker();

import path from 'path';
import { RankFactory } from "./factories/RankFactory";

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '../.env') });

console.log('Database URL:', process.env.DATABASE_URL);

const app = express();
app.use(express.json());

app.use(express.json({ limit: '50mb' }));

// PostgreSQL connection configuration
export const prisma = new PrismaClient();

app.use("/round", RoundFactory.routes());
app.use("/match", MatchFactory.routes());
app.use("/ranks", RankFactory.routes());

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

// Route to write to input.txt inside a specific Docker container
app.post('/containers/:id/write', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body; // Expecting content to write in input.txt

  try {
    const container = docker.getContainer(id);
    const exec = await container.exec({
      AttachStdout: true,
      AttachStderr: true,
      Cmd: ['sh', '-c', `echo "${content}" >> /app/server/server/var/input.txt`]
    });

    const stream = await exec.start({ hijack: true, stdin: true });

    stream.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    stream.on('end', () => {
      res.send('Content written to input.txt');
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to write to file');
  }
});


// Start the server
app.listen(3300, () => {
  console.log("Server is running on port 3300");
});
