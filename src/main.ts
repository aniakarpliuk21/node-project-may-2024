import express, {NextFunction, Request, Response} from 'express';
import {ApiError} from "./errors/api-error";
import {userRouter} from "./routers/user.router";
import {configure} from "./configs/configure";
import mongoose from "mongoose";
import {authRouter} from "./routers/auth.router";
import {postRouter} from "./routers/post.router";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";

const app = express();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/posts',postRouter)
app.use('*', (error:ApiError, req:Request, res:Response, next:NextFunction) => {
    const status = error.status ?? 500;
    const message = error.message ?? "Something went wrong";
    res.status(status).json({status,message});
})
process.on("uncaughtException", (error: ApiError) => {
    console.error("Uncaught Exception", error);
    process.exit(1);
});
app.listen(configure.port, async () => {
    await mongoose.connect(configure.mongoUrl)
    console.log(`Server has been started on port ${configure.port}`);
});