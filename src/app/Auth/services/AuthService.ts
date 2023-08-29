import jwt from "jsonwebtoken"

import AuthError from '@app/Auth/exception/AuthError'

import config from "@/config"

import { getValue, setValue } from "@/lib/redis"


export default class AuthService{
    async signIn(
        email: string, 
        password: string
        ): Promise<{user: object, token: string}> {
        const user = {
            id: '123',
            email: 'admin@admin.com',
            password: 'secret',
            fullName: 'Admin',
        }

        //Ver se o token está banido
        

        
        if (email !== user.email || password !== user.password) {
            throw new AuthError('Credenciais inválidas')
        }
        const {id, fullName} = user

        //Gerar o Token
        
        const token = jwt.sign({ id }, config.auth.secret, {
            expiresIn: config.auth.expiresIn,
        })

        return{
            user: {
                id,
                fullName,
                email,
            },
            token,
        }
    }
    async singOut(token: string): Promise<void>{
        await this.blacklistedToken(token)
    }

    async validateToken(token: string): Promise<string> {
        try {

            if (await this.isTokenBlacklisted(token))
                throw new AuthError('Token bloqueado')

            const decoded = jwt.verify(token, config.auth.secret)as {
                id: string
            }

            return decoded.id
        } catch (err) {
            throw new AuthError ('Token Invalido')
        }
    }

    private async isTokenBlacklisted(token: string): Promise<boolean> {
        const blacklistedToken = await getValue(`tokens:invalidated:${token}`)

        return !!blacklistedToken
    }

    

    private async blacklistedToken(token: string): Promise<void> {
        await setValue (`tokens:invalidated:${token}`, true )
        

    }
}