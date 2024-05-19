import { Router, Request, Response } from 'express'
import { prisma } from '..'

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

    console.log(req.body)

    res.status(200).json({
      message: 'Input added successfully',
    })
  }


}
