import {ApiError} from "../errors/api-error";
import {IPost, IPostCreateDto, IPostListQuery, IPostListResponse, IPostUpdateDto} from "../interfaces/post.interface";
import {postRepository} from "../repositories/post.repository";
import {postPresenter} from "../presenter/post.presenter";



class PostService {
    public async create(dto:IPostCreateDto): Promise<IPost> {
        return await postRepository.create(dto);
    }
    public async getList(query:IPostListQuery):Promise<IPostListResponse>{
        const { entities, total } = await postRepository.getList(query);
        return postPresenter.toResponseList(entities, total, query);
    }
    public async delete(postId:string): Promise<void> {
        const post = await postRepository.getPostById(postId);
        if (!post) {
            throw new ApiError("Post not found", 404);
        }
        await postRepository.delete(postId);
    }
    public async getPostById(postId:string):Promise<IPost>{
        return await postRepository.getPostById(postId);
    }
    public async updatePost(postId:string, dto: IPostUpdateDto,
    ): Promise<IPost> {
        const post = await postRepository.getPostById(postId);
        if (!post) {
            throw new ApiError("Post not found", 404);
        }
        return await postRepository.updatePost(postId, dto);
    }
}
export const postService = new PostService();