import {IUser, IUserListQuery, IUserListResponse, IUserResponse} from "../interfaces/user.interface";

class UserPresenter {
    public toResponse(entity:IUser):IUserResponse{
        return {
            _id:entity._id,
            name:entity.name,
            email:entity.email,
            age:entity.age,
            phone:entity.phone,
            role:entity.role,
            isDeleted:entity.isDeleted,
            isVerified:entity.isVerified,
            createdAt:entity.createdAt,
            updatedAt:entity.updatedAt,
        }
    }
    public toResponseList(
        entities: IUser[],
        total: number,
        query: IUserListQuery,
    ): IUserListResponse {
        return {
            total,
            data: entities.map(this.toResponse),
            ...query,
        };
    }
}
export const userPresenter = new UserPresenter();