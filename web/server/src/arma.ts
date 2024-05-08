import { Request, Response } from "express";

const allowedMethods = ["md5"];

export const armaAuth = async (req: Request, res: Response) => {
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
}