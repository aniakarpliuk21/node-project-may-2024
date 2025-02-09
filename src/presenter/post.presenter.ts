
import {IPost, IPostListQuery, IPostListResponse} from "../interfaces/post.interface";

class PostPresenter {
    public toResponse(entity:IPost){
        return{
            _id:entity._id,
            _userId:entity._userId,
            title:entity.title,
            content:entity.content,
            createdAt:entity.createdAt,
            updatedAt:entity.updatedAt,
            isDeleted:entity.isDeleted,
            isVerified:entity.isVerified,
        }
    }
    public toResponseList(
        entities: IPost[],
        total: number,
        query: IPostListQuery,
    ): IPostListResponse {
        return {
            total,
            data: entities.map(this.toResponse),
            ...query,
        };
    }
}
export const postPresenter = new PostPresenter();