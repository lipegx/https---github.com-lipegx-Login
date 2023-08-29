import { Router } from "express";

import auth from "@app/Auth/controller/AuthControllers";

const routes = Router()

routes.post('/auth/sign-in', auth.create)

export default routes