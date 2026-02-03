import { NextFunction, Router } from "express";
import { AuthController } from "./auth.controller";
import { UserValidation } from "../user/user.validation";


const router = Router();

router.post("/login",
    AuthController.login);

export const authRoutes = router;