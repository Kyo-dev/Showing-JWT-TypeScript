import { Request, Response } from 'express'

export async function getAuth(req: Request, res: Response): Promise<Response | void> {
  res.send('hola')
}
