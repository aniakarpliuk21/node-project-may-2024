import {NextFunction,Request,Response} from "express";
import {isObjectIdOrHexString} from "mongoose";
import {ApiError} from "../errors/api-error";
import {ObjectSchema} from "joi";

class CommonMiddleware {
    public isValid(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params[key];
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(`Invalid id ${key}`, 400)
                }
                next();
            } catch (e) {
                next(e);
            }
        }
    }

    public validateBody(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                next(e);
            }
        }
    }
    public validateQuery(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                req.query = await validator.validateAsync(req.query);
                next();
            }catch(e){
                new ApiError(e.details[0].message, 400)
            }
        }
    }
}
export const commonMiddleware = new CommonMiddleware();