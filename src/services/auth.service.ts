import {userRepository} from "../repositories/user.repository";
import {passwordService} from "./password.service";
import {ApiError} from "../errors/api-error";
import {IUserCreateDto, IUserLoginDto, IUserResponse} from "../interfaces/user.interface";
import {userService} from "./user.service";
import {tokenService} from "./token.service";
import {tokenRepository} from "../repositories/token.repository";
import {ITokenPair, ITokenPayload} from "../interfaces/token.interface";
import {userPresenter} from "../presenter/user.presenter";

class AuthService {
    public async register(dto:IUserCreateDto): Promise<{user:IUserResponse,tokens:ITokenPair}> {
        await userService.isEmailUnique(dto.email)
        const password = await passwordService.hashPassword(dto.password);
        const user = await userRepository.create({...dto,password});
        const tokens = tokenService.generateTokens({userId:user._id,role:user.role})
        await tokenRepository.create({...tokens,_userId:user._id})
        return {user:userPresenter.toResponse(user), tokens}
    }
    public async login(dto: IUserLoginDto): Promise<{user:IUserResponse,tokens:ITokenPair}> {
        const user = await userRepository.getByEmail(dto.email);
        const isPasswordCorrect  = await passwordService.comparePassword(dto.password, user.password);
        if(!isPasswordCorrect) {
            throw new ApiError ("Incorrect email or password",401);
        }
        const tokens = tokenService.generateTokens({userId:user._id,role:user.role});
        await tokenRepository.create({...tokens,_userId:user._id})
        return {user:userPresenter.toResponse(user), tokens}
    }
    public async logout(tokenPayload:ITokenPayload): Promise<void> {
        await tokenRepository.deleteAllByParams({ _userId: tokenPayload.userId });
    }
}
export const authService = new AuthService();