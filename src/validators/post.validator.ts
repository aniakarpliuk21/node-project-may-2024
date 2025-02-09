import Joi from 'joi';
import {regexConstans} from "../constans/regex.constans";
import {OrderEnum} from "../enums/order.enum";
import {UserListOrderEnum} from "../enums/user-list-order.enum";
import {PostListOrderEnum} from "../enums/post-list-order.enum";
export class PostValidator {
    private static title = Joi.string()
        .regex(regexConstans.TITLE)
        .min(5)
        .max(100)
        .trim();
    private static content = Joi.string()
        .min(10)
        .max(5000)
        .regex(regexConstans.CONTENT).trim();

    public static create = Joi.object({
        title: this.title.required().messages({
            "string.base": "Title must be a string",
            "string.empty": "Title cannot be empty",
            "string.pattern.base": "Title does not match the required pattern",
            "string.min": "Title must be at least 5 character",
            "string.max": "Title must be less than 100 characters",
            "any.required": "Title is a required field",
        }),
        content: this.content.required().messages({
            "string.base": "Body must be a string",
            "string.empty": "Body cannot be empty",
            "string.pattern.base": "Body does not match the required pattern",
            "string.min": "Body must be at least 5 character",
            "string.max": "Body must be less than 100 characters",
            "any.required": "Body is a required field",
        }),
    });
    public static update = Joi.object({
        title: this.title.optional(),
        content: this.content.optional(),
    });
    public static getListQuery = Joi.object({
        limit: Joi.number().min(1).max(100).default(10),
        page: Joi.number().min(1).default(1),
        search: Joi.string().trim(),
        order: Joi.string()
            .valid(...Object.values(OrderEnum))
            .default(OrderEnum.ASC),
        orderBy: Joi.string()
            .valid(...Object.values(PostListOrderEnum))
            .default(UserListOrderEnum.CREATED_AT),
    });
}