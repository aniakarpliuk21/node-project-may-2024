import {NextFunction,Request,Response} from "express";
import {userService} from "../services/user.service";
import {IUser, IUserListQuery} from "../interfaces/user.interface";
import {ITokenPayload} from "../interfaces/token.interface";
import {userPresenter} from "../presenter/user.presenter";
import {ApiError} from "../errors/api-error";

class UserController {
    public async getList(req: Request, res: Response,next: NextFunction) {
        try{
            const query = req.query as unknown as IUserListQuery;
            const result = await userService.getList(query);
            res.json(result);
        }catch (e){
            next(e);
        }
    }
    public async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const result = await userService.getUserById(userId);
            const response = userPresenter.toResponse(result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
    public async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try{
            const {email} = req.body;
            if (!email) {
                throw new ApiError("Email is required", 400);
            }
            const result = await userService.getUserByEmail(email);
            res.status(200).json(result);
        }catch(e){
            next(e);
        }
    }
    public async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
            const result = await userService.getMe(tokenPayload);
            const response = userPresenter.toResponse(result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
            await userService.delete(tokenPayload);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
            const dto = req.body as IUser;
            const result = await userService.updateUser(tokenPayload, dto);
            const response = userPresenter.toResponse(result);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }
}
export const userController = new UserController();