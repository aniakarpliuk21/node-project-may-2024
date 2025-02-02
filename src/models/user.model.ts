import {model, Schema} from "mongoose";
import {RoleEnum} from "../enums/role.enum";
import {IUser} from "../interfaces/user.interface";
const UserSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    role:{enum:RoleEnum,type:String,required:true,default:RoleEnum.USER},
    isDeleted:{type:Boolean,default:false},
    isVerified:{type:Boolean,default:false},
},
    {timestamps:true,versionKey:false,}
);
export const User = model<IUser>("users", UserSchema);