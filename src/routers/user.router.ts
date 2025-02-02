import { Router } from 'express';
import {userController} from "../controllers/user.controller";
import {commonMiddleware} from "../middlewares/commom.middleware";
import {UserValidator} from "../validators/user.validator";
const router = Router();

router.get('/', userController.getList);
router.post('/', commonMiddleware.validateBody(UserValidator.create), userController.create);
router.delete("/:userId", userController.delete);
router.get(
    "/:userId", commonMiddleware.isValid('userId'),userController.getUserById,
);
router.put(
    "/:userId",
    commonMiddleware.validateBody(UserValidator.update),
    userController.updateUser,
);
export const userRouter = router;