declare namespace Express {
    interface Request {
        user: {
            id: any
            token: string
        }
    }
}