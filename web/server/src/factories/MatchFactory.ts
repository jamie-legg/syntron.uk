import { Router, Request, Response } from "express";
import { prisma } from "..";
import { GameData } from "../types";

export class MatchFactory {
  public static routes(): Router {
    const router = Router();
    router.post("/", this.addMatch);
    return router;
  }

  private static async addMatch(req: Request, res: Response): Promise<void> {
    const data = req.body as GameData;
    console.log('Match Ended, processing data...');
    

    const { players, playerCounts } = data;
    console.log(JSON.stringify(players));
    // calculate average playercount
    const totalPlayers = playerCounts.reduce((a, b) => a + b, 0);
    const averagePlayers = totalPlayers / playerCounts.length || 2;
    console.log('Average player count: ', averagePlayers);
    
    const maxPoints = averagePlayers * 10;

    const orderedPlayers = players.sort((a, b) => {
      return b.currentMatchPoints - a.currentMatchPoints;
    });

    console.log('Max available points: ', maxPoints);
    

    const updatedPlayers = orderedPlayers.forEach(async (player, index) => {
      const { nickname, ip, auth, login, kills, deaths, time, active } = player;
      if (!auth || !active) return;
      const points = maxPoints - (index * 10);

      console.log(
        "Calculating points for" +
          nickname +
          " " +
          points +
          " points for " +
          index +
          " place"
      );

      const existingPlayer = await prisma.player.findFirst({
        where: {
          login,
        },
      });

      if (existingPlayer) {
        console.log("Player already exists, updating points");

        const updatedPlayer = await prisma.player.update({
          where: { id: existingPlayer.id },
          data: {
            nickname,
            points: existingPlayer.points + points,
            matches: existingPlayer.matches + 1,
            kills: existingPlayer.kills + kills,
            deaths: existingPlayer.deaths + deaths,
            timePlayed: existingPlayer.timePlayed + time,
          },
        });
        console.log("Player updated successfully");
      } else {
        console.log("Player does not exist, adding player to database");

        const newPlayer = await prisma.player.create({
          data: {
            nickname,
            ip: ip || "",
            login,
            matches: 1,
            points,
          },
        });
        console.log("Player added successfully");
      }
    });

    res.status(200).json({
      message: "Input added successfully",
    });
  }
}
