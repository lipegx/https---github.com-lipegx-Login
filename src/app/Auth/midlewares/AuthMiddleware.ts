import { NextFunction, Request, Response } from "express";

import AuthService from "@app/Auth/services/AuthService";
 
import AuthError from "@app/Auth/exception/AuthError";

export default async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader) return res.status(401).json ({ error: 'Sem token permitido'})

    // Bearer (token) 
    const [, token] = authHeader.split(' ')

    //Verificar token valido
    
    try {

        const id = await new AuthService().validateToken(token)

        req.user = { id, token }
    } catch (error) {
        if (error instanceof AuthError) {
        return res.status(401).send()
        }
        
        return res.status(500).json({ error });
    }

    return next()
}

    