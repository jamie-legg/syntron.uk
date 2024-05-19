import { Router, Request, Response } from 'express'
import { prisma } from '..'

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

    console.log(req.body)

    res.status(200).json({
      message: 'Input added successfully',
    })
  }


}
