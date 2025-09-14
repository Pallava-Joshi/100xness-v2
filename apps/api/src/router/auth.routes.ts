import { Router } from "express";
import { singup } from "../controller/auth.controller";

export const authRouter: Router = Router();

authRouter.post("/", singup)