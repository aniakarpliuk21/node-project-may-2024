import {IUser, IUserCreateDto, IUserUpdateDto} from "../interfaces/user.interface";
import {User} from "../models/user.model";


class UserRepository {
    public async getList():Promise<IUser[]>{
        return await User.find();
    }
    public async create(dto:IUserCreateDto):Promise<IUser>{
        return await User.create(dto);

    }
    public async delete(userId: string): Promise<void> {
        await User.deleteOne({ _id: userId });
    }
    public async getUserById(userId:string):Promise<IUser>{
        return await User.findById(userId);
    }
    public async updateUser(userId: string, dto: IUserUpdateDto): Promise<IUser> {
        return await User.findByIdAndUpdate(userId, dto, { new: true });
    }
    public async getByEmail(email:string):Promise<IUser>{
        return await User.findOne({email})
    }
}
export const userRepository = new UserRepository();