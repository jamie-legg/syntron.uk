import { Router, Request, Response } from "express";
import { prisma } from "..";
import { Rank } from "../types";
import { emptyRank } from "../utils";

export class RankFactory {
  public static routes(): Router {
    const router = Router();

    router.get("/", this.getRanks);
    return router;
  }

  private static async getRanks(req: Request, res: Response): Promise<void> {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    const login = req.query.login as string;
    if (login) {
      // Fetch the player's data
      const player = await prisma.player.findFirst({
        where: { login },
        select: {
          login: true,
          points: true,
          matches: true,
          kills: true,
          deaths: true,
        },
      });

      if (!player) {
        res.status(200).json({ ...emptyRank, login: login });
        return;
      }

      const kd = Math.floor((player.kills / player.deaths) * 100) / 100 || 0;

      // Count the number of players with more points than the current player
      const playerRank = await prisma.player.count({
        where: {
          points: {
            gt: player.points,
          },
        },
      });

      // Calculate the player's rank (1-based index)
      const rank = playerRank + 1;

      res.status(200).json({ ...player, rank, kd });
      return;
    }

    // Fetch the top players based on the limit
    const ranks = await prisma.player.findMany({
      select: {
        login: true,
        points: true,
        matches: true,
        kills: true,
        deaths: true,
      },
      take: limit,
      orderBy: {
        points: "desc",
      },
    });

    const ranksWithKd = ranks.map(
      ({ login, points, matches, kills, deaths }) => {
        const kd = Math.floor((kills / deaths) * 100) / 100 || 0;
        return { login, points, matches, kd };
      }
    ) as Rank[];

    res.status(200).json(ranksWithKd);
  }
}
