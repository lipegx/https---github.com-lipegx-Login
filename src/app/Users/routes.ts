import { Router } from "express";

import AuthMiddleware from "@app/Auth/midlewares/AuthMiddleware";

import users from "@app/Users/controllers/UsersController";

const routes = Router()

routes.get('/users', AuthMiddleware, users.index)

export default routes