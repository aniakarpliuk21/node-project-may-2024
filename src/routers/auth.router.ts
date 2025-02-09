import { Router } from 'express';
import {commonMiddleware} from "../middlewares/commom.middleware";
import {UserValidator} from "../validators/user.validator";
import {authController} from "../controllers/auth.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
const router = Router();
router.post('/register', commonMiddleware.validateBody(UserValidator.create),
    authController.register);
router.post('/login',commonMiddleware.validateBody(UserValidator.login), authController.login)
router.post('/logout',authMiddleware.checkAccessToken,authController.logout)
export const authRouter = router;