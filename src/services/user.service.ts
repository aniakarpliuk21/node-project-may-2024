import {
    IUser,
    IUserListQuery,
    IUserListResponse,
    IUserResponse,
    IUserUpdateDto
} from "../interfaces/user.interface";
import {userRepository} from "../repositories/user.repository";
import {ApiError} from "../errors/api-error";
import {ITokenPayload} from "../interfaces/token.interface";
import {userPresenter} from "../presenter/user.presenter";

class UserService {
    public async getList(query:IUserListQuery):Promise<IUserListResponse>{
        const { entities, total } = await userRepository.getList(query);
        return userPresenter.toResponseList(entities, total, query);
    }
    public async isEmailUnique(email:string):Promise<void>{
        const user = await userRepository.getByEmail(email);
        if(user){
            throw new ApiError ("Email is already in use",409);
        }
    }
    public async delete(tokenPayload:ITokenPayload): Promise<void> {
        const user = await userRepository.getUserById(tokenPayload.userId);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        await userRepository.delete(tokenPayload.userId);
    }
    public async getUserById(userId:string):Promise<IUser>{
        return await userRepository.getUserById(userId);
    }
    public async getUserByEmail(email:string):Promise<IUserResponse>{
        const user = await userRepository.getByEmail(email);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        return userPresenter.toResponse(user);

    }    public async getMe(tokenPayload: ITokenPayload): Promise<IUser> {
        const user = await userRepository.getUserById(tokenPayload.userId);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        return user;
    }
    public async updateUser(
        tokenPayload: ITokenPayload,
        dto: IUserUpdateDto,
    ): Promise<IUser> {
        const user = await userRepository.getUserById(tokenPayload.userId);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        return await userRepository.updateUser(tokenPayload.userId, dto);
    }
}
export const userService = new UserService();