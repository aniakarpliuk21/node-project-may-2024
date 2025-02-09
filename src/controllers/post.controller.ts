import {NextFunction,Request,Response} from "express";
import {IPost, IPostListQuery} from "../interfaces/post.interface";
import {postService} from "../services/post.service";
import {postPresenter} from "../presenter/post.presenter";
import {ApiError} from "../errors/api-error";
class PostController {
    public async create(req: Request, res: Response, next: NextFunction) {
            try {
                const postData = req.body as IPost;
                const userId = req.res.locals.tokenPayload.userId;
                if (!userId) {
                    return next(new ApiError("Unauthorized", 401));
                }
                const newPost = {
                    ...postData,
                    _userId: userId,
                };
                const result = await postService.create(newPost);
                res.status(201).json(result);
            } catch (e) {
               next(e);
            }
    }
    public async getList(req: Request, res: Response,next: NextFunction) {
        try{
            const query = req.query as unknown as IPostListQuery;
            const result = await postService.getList(query);
            res.json(result);
        }catch (e){
            next(e);
        }
    }
    public async getPostById(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = req.params.postId;
            const result = await postService.getPostById(postId);
            const response = postPresenter.toResponse(result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = req.params.postId;
            await postService.delete(postId);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
    public async updatePost(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = req.params.postId;
            const dto = req.body as IPost;
            const result = await postService.updatePost(postId, dto);
            const response = postPresenter.toResponse(result);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }
}
export const postController = new PostController();