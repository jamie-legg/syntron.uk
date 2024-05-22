import { Router, Request, Response } from 'express'
import { prisma } from '..'

type TRoundPlayerEntry = {
  nickname: string
  ip: string
  auth: boolean
  login: string
}

export class RoundFactory {
  public static routes(): Router {
    const router = Router()

    router.get('/', this.getRound)
    router.post('/', this.addRound)
    return router
  }

  private static async getRound(
    req: Request,
    res: Response,
  ): Promise<void> {
    // const Rounds = await prisma.sbclRound.findMany({
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


  private static async addRound(
    req: Request,
    res: Response,
  ): Promise<void> {

    //? Every round we check if the players present in the round are already present in the database
    //? if not we add them to the database, as well as updating nicknames

    const roundEntry = req.body as TRoundPlayerEntry[]
    const newPlayerNames:string[] = []
    roundEntry.forEach(async (entry) => {
      const { nickname, ip, auth, login } = entry
      if(!auth) return

      const existingPlayer = await prisma.player.findFirst({
        where: {
          login
        }
      })

      if (existingPlayer) {
        const updatedPlayer = await prisma.player.update({
          where: { id: existingPlayer.id },
          data: { nickname, ip },
        })
      } else {
        const newPlayer = await prisma.player.create({
          data: {
            nickname,
            ip,
            login,
            points: 0,
            kdr: 0,
            matches: 0,
          }
        })
        newPlayerNames.push(nickname)
      }
    })

    res.status(200).json({
      message: 'Give a warm welcome to our new players: ' + newPlayerNames.join(', ') + '!'
    })
  }


}
