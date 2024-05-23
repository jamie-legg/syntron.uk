import { Router, Request, Response } from 'express'
import { prisma } from '..'
import { GameData } from '../types'



export class MatchFactory {
  public static routes(): Router {
    const router = Router()

    router.get('/', this.getMatch)
    router.post('/', this.addMatch)
    return router
  }

  private static async getMatch(
    req: Request,
    res: Response,
  ): Promise<void> {
    // const Matchs = await prisma.sbclMatch.findMany({
    //   include: {
    //     createdBy: {
    //       select: {
    //         firstName: true,
    //         lastName: true,
    //       },
    //     },
    //     updatedBy: {
    //       select: {
    //         firstName: true,
    //         lastName: true,
    //       },
    //     },
    //   },
    // })
    res.status(200).json(req.body)
  }

  private static async addMatch(
    req: Request,
    res: Response,
  ): Promise<void> {
    const data = req.body as GameData

    const { rounds, totalTime, date, players } = data
    console.log(JSON.stringify(players));
    

    // ? Calculate placement for each player
    // ? Calculate total points for each player
    // ? Max points for the winner is players.length * 10
    // ? Min points for the loseer is 10
    // ? For example
    // ? 4 players
    // ? 1st place gets 40 points
    // ? 2nd place gets 30 points
    // ? 3rd place gets 20 points
    // ? 4th place gets 10 points

    const maxPoints = players.length * 10

    const orderedPlayers = players.sort((a, b) => {
      return b.currentMatchPoints - a.currentMatchPoints
    })

    const updatedPlayers =  orderedPlayers.forEach(async (player, index) => {
            const { nickname, ip, auth, login } = player
      if (!auth) return
      const points = maxPoints - (index * 10)

      console.log('Calculating points for' + nickname + ' ' + points + ' points for ' + index + ' place')
      

      const existingPlayer = await prisma.player.findFirst({
        where: {
          login,
        },
      })

      if(existingPlayer) {
        console.log('Player already exists, updating points');
        
        const updatedPlayer = await prisma.player.update({
          where: { id: existingPlayer.id },
          data: { nickname, ip, points: existingPlayer.points + points, matches: existingPlayer.matches + 1},
        })
        console.log('Player updated successfully');
        
      }
      else {
        console.log('Player does not exist, adding player to database');
        
        const newPlayer = await prisma.player.create({
        data: {
          nickname,
          ip,
          login,
          matches: 1,
          points,
          kdr: 0,
        },
      })
      console.log('Player added successfully');
      
      }
    })

    res.status(200).json({
      message: 'Input added successfully',
    })
  }


}
