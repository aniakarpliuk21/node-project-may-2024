import {IUser, IUserCreateDto, IUserListQuery, IUserUpdateDto} from "../interfaces/user.interface";
import {User} from "../models/user.model";
import {UserListOrderEnum} from "../enums/user-list-order.enum";
import {FilterQuery, SortOrder} from "mongoose";
import {ApiError} from "../errors/api-error";


class UserRepository {
    public async getList(query:IUserListQuery):Promise<{ entities: IUser[]; total: number }>{
        const filterObj: FilterQuery<IUser> = { isDeleted: false };
        if (query.search) {
            filterObj.name = { $regex: query.search, $options: "i" };
        }
        const skip = query.limit * (query.page - 1);
        const sortObj: { [key: string]: SortOrder } = {};
        switch (query.orderBy) {
            case UserListOrderEnum.NAME:
                sortObj.name = query.order;
                break;
            case UserListOrderEnum.AGE:
                sortObj.age = query.order;
                break;
            case UserListOrderEnum.CREATED_AT:
                sortObj.created_at = query.order;
                break;
            default:
                throw new ApiError("Invalid order by", 400);
        }
        const [entities, total] = await Promise.all([
            User.find(filterObj).sort(sortObj).limit(query.limit).skip(skip),
            User.countDocuments(filterObj),
        ]);
        return { entities, total };
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
    public async getByEmail(email: string): Promise<IUser> {
        return await User.findOne({ email }).lean();
    }
}
export const userRepository = new UserRepository();