import { Request, Response } from "express";
import { prisma } from "..";
import jwt from "jsonwebtoken";

const allowedMethods = ["md5"];

export class AuthFactory {
  public static gameRoutes() {
    const router = require("express").Router();
    router.get("/0.1", this.armaAuth);

    return router;
  }

  public static routes() {
    const router = require("express").Router();
    router.post("/", this.createAuth);

    return router;
  }

  private static createAuth = async (req: Request, res: Response) => {
    const { id, name, email, image } = req.body;

    // Check if user already exists in the database by ID or email
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

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
  };

  private static armaAuth = async (req: Request, res: Response) => {
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
        if (allowedMethods.includes(method as string)) {
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
  };
}
