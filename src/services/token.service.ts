import jwt, {SignOptions} from "jsonwebtoken";
import {TokenEnum} from "../enums/token.enum";
import {ApiError} from "../errors/api-error";
import {ITokenPair, ITokenPayload} from "../interfaces/token.interface";
import {configure} from "../configs/configure";

class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = jwt.sign(payload, configure.jwtAccessSecret as string, {
            expiresIn: configure.jwtAccessExpiresIn as string,
        } as SignOptions);

        const refreshToken = jwt.sign(payload, configure.jwtRefreshSecret as string, {
            expiresIn: configure.jwtRefreshExpiresIn as string,
        } as SignOptions);

        return { accessToken, refreshToken };
    }
    public verifyToken(
        token: string,
        type: TokenEnum,
    ): ITokenPayload {
        try {
            let secret: string;
            switch (type) {
                case TokenEnum.ACCESS:
                    secret = configure.jwtAccessSecret;
                    break;
                case TokenEnum.REFRESH:
                    secret = configure.jwtRefreshSecret;
                    break;
                default:
                    throw new ApiError("Invalid token type", 401);
            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            throw new ApiError("Invalid token", 401);
        }
    }
}
export const tokenService = new TokenService();