import dotenv from "dotenv";

dotenv.config();
export const configure  = {
    port: process.env.PORT || 3000,
    mongoUrl:process.env.MONGO_DB_URL || 'mongodb://localhost:27017/express-mongo',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
}
