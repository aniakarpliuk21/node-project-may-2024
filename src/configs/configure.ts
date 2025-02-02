import dotenv from "dotenv";

dotenv.config();
export const configure  = {
    port: process.env.PORT || 3000,
    mongoUrl:process.env.MONGO_DB_URL || 'mongodb://localhost:27017/express-mongo',
}
