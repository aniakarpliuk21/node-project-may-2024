import Joi from 'joi';
import {regexConstans} from "../constans/regex.constans";
export class UserValidator {
    private static name = Joi.string()
        .regex(regexConstans.NAME)
        .min(1)
        .max(99)
        .trim();
    private static email = Joi.string().regex(regexConstans.EMAIL).email().trim();
    private static password = Joi.string().regex(regexConstans.PASSWORD).trim();
    private static phone = Joi.string().regex(regexConstans.PHONE).trim();

    public static create = Joi.object({
        name: this.name.required().messages({
            "string.base": "Name must be a string",
            "string.empty": "Name cannot be empty",
            "string.pattern.base": "Name does not match the required pattern",
            "string.min": "Name must be at least 1 character",
            "string.max": "Name must be less than 99 characters",
            "any.required": "Name is a required field",
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
        phone: this.phone.optional().messages({
            "string.base": "Phone must be a string",
            "string.empty": "Phone cannot be empty",
            "string.pattern.base": "Phone does not match the required pattern",
        }),
    });
    public static update = Joi.object({
        password: this.password.optional(),
        phone: this.phone.optional(),
    });
}