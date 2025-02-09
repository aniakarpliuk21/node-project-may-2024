import Joi from 'joi';
import {regexConstans} from "../constans/regex.constans";
import {OrderEnum} from "../enums/order.enum";
import {UserListOrderEnum} from "../enums/user-list-order.enum";
export class UserValidator {
    private static name = Joi.string()
        .regex(regexConstans.NAME)
        .min(1)
        .max(19)
        .trim();
    private static email = Joi.string()
        .regex(regexConstans.EMAIL)
        .email().trim();
    private static password = Joi.string()
        .regex(regexConstans.PASSWORD)
    .trim();
    private static phone = Joi.string()
        .regex(regexConstans.PHONE)
        .trim();
    private static age = Joi.number().min(1).max(99);

    public static create = Joi.object({
        name: this.name.required().messages({
            "string.base": "Name must be a string",
            "string.empty": "Name cannot be empty",
            "string.pattern.base": "Name does not match the required pattern",
            "string.min": "Name must be at least 1 character",
            "string.max": "Name must be less than 99 characters",
            "any.required": "Name is a required field",
        }),
        age: this.age.required().messages({
            "number.base": "Age must be a number",
            "number.min": "Age must be at least 1",
            "number.max": "Age cannot exceed 99",
        }),
        email: this.email.required().messages({
            "string.base": "Email must be a string",
            "string.empty": "Email cannot be empty",
            "string.email": "Email must be a valid email address",
            "string.pattern.base": "Email does not match the required pattern",
            "any.required": "Email is a required field",
        }),
        password: this.password.required().messages({
            "string.base": "Password must be a string",
            "string.empty": "Password cannot be empty",
            "string.pattern.base": "Password does not match the required pattern",
            "any.required": "Password is a required field",
        }),
        phone: this.phone.required().messages({
            "string.base": "Phone must be a string",
            "string.empty": "Phone cannot be empty",
            "string.pattern.base": "Phone does not match the required pattern",
        }),
    });
    public static update = Joi.object({
        password: this.password.optional(),
        phone: this.phone.optional(),
        age: this.age.optional(),
    });
    public static login = Joi.object({
        email: this.email.required().messages({
            "string.base": "Email must be a string",
            "string.empty": "Email cannot be empty",
            "string.email": "Email must be a valid email address",
            "string.pattern.base": "Email does not match the required pattern",
            "string.required": "Email is a required field",
        }),
        password: this.password.required().messages({
            "string.base": "Password must be a string",
            "string.empty": "Password cannot be empty",
            "string.pattern.base": "Password does not match the required pattern",
            "string.required": "Password is a required field",
        }),
    });
    public static emailValid = Joi.object({
        email: this.email.required().messages({
            "string.base": "Email must be a string",
            "string.empty": "Email cannot be empty",
            "string.email": "Email must be a valid email address",
            "string.pattern.base": "Email does not match the required pattern",
            "string.required": "Email is a required field",
        }),
    });
    public static getListQuery = Joi.object({
        limit: Joi.number().min(1).max(100).default(10),
        page: Joi.number().min(1).default(1),
        search: Joi.string().trim(),
        order: Joi.string()
            .valid(...Object.values(OrderEnum))
            .default(OrderEnum.ASC),
        orderBy: Joi.string()
            .valid(...Object.values(UserListOrderEnum))
            .default(UserListOrderEnum.CREATED_AT),
    });
}