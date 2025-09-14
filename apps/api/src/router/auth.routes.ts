import { Router } from "express";
import { login, register } from "../controller/auth.controller";

export const authRouter: Router = Router();

authRouter.post("/signin", register);
authRouter.get("/signin/post", login);
