import { Router, Request, Response } from "express";
import { prisma } from "..";
import { RoundPlayerEntry } from "../types";

export class RankFactory {
  public static routes(): Router {
    const router = Router();

    router.get("/", this.getRanks);
    return router;
  }

  private static async getRanks(req: Request, res: Response): Promise<void> {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const ranks = await prisma.player.findMany({
      select: {
        nickname: true,
        points: true,
        matches: true
      },
      take: limit,
      orderBy: {
        points: "desc",
      },
    });
    res.status(200).json(ranks);
  }
}
