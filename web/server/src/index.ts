import express, { Request, Response } from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import Docker from 'dockerode';
import { RoundFactory } from "./factories/RoundFactory";
import { MatchFactory } from "./factories/MatchFactory";
import { config } from "dotenv";

// Initialize the Dockerode instance
const docker = new Docker();

import path from 'path';
import { RankFactory } from "./factories/RankFactory";
import { AuthFactory } from "./factories/AuthFactory";

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
app.use("/auth", AuthFactory.routes());
app.use("/armaauth/", AuthFactory.gameRoutes());



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



// Start the server
app.listen(3300, () => {
  console.log("Server is running on port 3300");
});
