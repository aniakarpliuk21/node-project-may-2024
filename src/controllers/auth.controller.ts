import {NextFunction, Request, Response} from "express";
import {authService} from "../services/auth.service";
import {IUserCreateDto, IUserLoginDto} from "../interfaces/user.interface";
import {ITokenPayload} from "../interfaces/token.interface";


class AuthController {
    public async register(req: Request, res: Response,next: NextFunction) {
        try{
            const dto = req.body as IUserCreateDto;
            const result = await authService.register(dto);
            res.status(201).json(result);
        }catch(e){
            next(e);
        }
    }
  public async login(req: Request, res: Response, next: NextFunction){
      try{
          const dto = req.body as IUserLoginDto;
          const result = await authService.login(dto);
          res.status(201).json(result);
      }catch(e){
          next(e);
      }
  }
  public async logout(req: Request, res: Response, next: NextFunction){
        try{
            const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
            const result = await authService.logout(tokenPayload)
            res.json(result);
        }catch(e){
            next(e);
        }
  }
}
export const authController = new AuthController();