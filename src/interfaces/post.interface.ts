import {PostListOrderEnum} from "../enums/post-list-order.enum";
import {OrderEnum} from "../enums/order.enum";

export interface IPost {
    _id: string;
    _userId: string;
    title: string;
    content: string;
    isDeleted:boolean;
    isVerified:boolean;
    createdAt:Date;
    updatedAt:Date;
}
export type IPostListQuery = {
    page: number;
    limit: number;
    search?: string;
    order: OrderEnum;
    orderBy: PostListOrderEnum;
};


export type IPostCreateDto = Pick<
    IPost,
    "title" | "content"
>;

export type IPostUpdateDto = Pick<IPost, "title" | "content">;

export interface IPostListResponse extends IPostListQuery {
    data: IPost[];
    total: number;
}

