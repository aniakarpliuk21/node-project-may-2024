import { Router } from 'express';
import {userController} from "../controllers/user.controller";
import {commonMiddleware} from "../middlewares/commom.middleware";
import {UserValidator} from "../validators/user.validator";
import {authMiddleware} from "../middlewares/auth.middleware";
const router = Router();

router.get('/', commonMiddleware.validateQuery(UserValidator.getListQuery),authMiddleware.checkAccessToken,userController.getList);
router.get("/me", authMiddleware.checkAccessToken, userController.getMe);
router.delete("/me",authMiddleware.checkAccessToken, userController.delete);
router.put(
    "/me",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateBody(UserValidator.update),
    userController.updateUser,
);
router.get(
    "/:userId",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValid("userId"),
    userController.getUserById,
);
router.get(
    "/me/email",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateBody(UserValidator.emailValid),
    userController.getUserByEmail
);
export const userRouter = router;