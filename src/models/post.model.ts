import {model, Schema} from "mongoose";
import {IPost} from "../interfaces/post.interface";
import {User} from "./user.model";
const PostSchema = new Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
_userId: { type: Schema.Types.ObjectId, required: true, ref: User },
    isDeleted:{type:Boolean,default:false},
    isVerified:{type:Boolean,default:false},
},
    {timestamps:true,versionKey:false,}
);
export const Post = model<IPost>("posts", PostSchema);