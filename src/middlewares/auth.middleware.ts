import {ApiError} from "../errors/api-error";
import {NextFunction,Response,Request} from "express";
import {tokenService} from "../services/token.service";
import {TokenEnum} from "../enums/token.enum";
import {tokenRepository} from "../repositories/token.repository";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new ApiError("No token provided", 401);
            }
            const accessToken = header.split("Bearer ")[1];
            if (!accessToken) {
                throw new ApiError("No token provided", 401);
            }
            const tokenPayload = tokenService.verifyToken(
                accessToken,
                TokenEnum.ACCESS,
            );

            const pair = await tokenRepository.findByParams({accessToken});
            if (!pair) {
                throw new ApiError("Invalid token", 401);
            }
            req.res.locals.tokenId = pair._id;
            req.res.locals.tokenPayload = tokenPayload;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();