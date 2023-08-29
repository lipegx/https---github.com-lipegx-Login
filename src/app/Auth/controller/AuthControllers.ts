import { Request, Response } from "express";

class AuthController {
    async create(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({message : 'Hello World'})
    }

    async destroy() {}

}

export default new AuthController()