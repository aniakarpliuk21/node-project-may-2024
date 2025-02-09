import {IPost, IPostCreateDto, IPostListQuery, IPostUpdateDto} from "../interfaces/post.interface";
import {FilterQuery, SortOrder} from "mongoose";
import {ApiError} from "../errors/api-error";
import {PostListOrderEnum} from "../enums/post-list-order.enum";
import {Post} from "../models/post.model";


class PostRepository {
    public async getList(query:IPostListQuery):Promise<{ entities: IPost[]; total: number }>{
        const filterObj: FilterQuery<IPost> = { isDeleted: false };
        if (query.search) {
            filterObj.title = { $regex: query.search, $options: "i" };
        }
        const skip = query.limit * (query.page - 1);
        const sortObj: { [key: string]: SortOrder } = {};
        switch (query.orderBy) {
            case PostListOrderEnum.TITLE:
                sortObj.name = query.order;
                break;
            case PostListOrderEnum.CREATED_AT:
                sortObj.created_at = query.order;
                break;
            default:
                throw new ApiError("Invalid order by", 400);
        }
        const [entities, total] = await Promise.all([
            Post.find(filterObj).sort(sortObj).limit(query.limit).skip(skip),
            Post.countDocuments(filterObj),
        ]);
        return { entities, total };
    }
    public async create(dto:IPostCreateDto):Promise<IPost>{
        return await Post.create(dto);

    }
    public async delete(postId: string): Promise<void> {
        await Post.deleteOne({ _id: postId });
    }
    public async updatePost(postId: string, dto: IPostUpdateDto): Promise<IPost> {
        return await Post.findByIdAndUpdate(postId, dto, { new: true });
    }
    public async getPostById(postId: string): Promise<IPost> {
        return await Post.findById(postId);
    }
}
export const postRepository = new PostRepository();