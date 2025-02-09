import { Router } from 'express';
import {commonMiddleware} from "../middlewares/commom.middleware";
import {postController} from "../controllers/post.controller";
import {PostValidator} from "../validators/post.validator";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();
router.get("/",commonMiddleware.validateQuery(PostValidator.getListQuery),postController.getList)
router.get('/:postId',commonMiddleware.isValid("postId"),postController.getPostById)
router.post("/",authMiddleware.checkAccessToken,
    commonMiddleware.validateBody(PostValidator.create),
    postController.create)
router.delete("/:postId",authMiddleware.checkAccessToken,commonMiddleware.isValid("postId"),postController.delete);
router.put("/:postId",authMiddleware.checkAccessToken,commonMiddleware.validateBody(PostValidator.update),postController.updatePost)

export const postRouter = router;