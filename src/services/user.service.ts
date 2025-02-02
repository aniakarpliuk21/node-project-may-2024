import {IUser, IUserCreateDto, IUserUpdateDto} from "../interfaces/user.interface";
import {userRepository} from "../repositories/user.repository";
import {ApiError} from "../errors/api-error";

class UserService {
    public async getList():Promise<IUser[]>{
        return await userRepository.getList();
    }
    public async create(dto:IUserCreateDto): Promise<IUser> {
        await this.isEmailUnique(dto.email)
        return await userRepository.create(dto);
    }
    private async isEmailUnique(email:string):Promise<void>{
        const user = await userRepository.getByEmail(email);
        if(user){
            throw new ApiError ("Email is already in use",409);
        }
    }
    public async delete(userId: string): Promise<void> {
        await userRepository.delete(userId);
    }
    public async getUserById(userId:string):Promise<IUser>{
        return await userRepository.getUserById(userId);
    }
    public async updateUser(userId: string, dto: IUserUpdateDto): Promise<IUser> {
        return await userRepository.updateUser(userId, dto);
    }
}
export const userService = new UserService();