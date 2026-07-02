import dotenv from 'dotenv';
dotenv.config();
const requiredEnv = ['PORT', 'DB_URL', 'username_NCIndia', 'password_NCIndia'];
for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}
export const env = {
    port: Number(process.env.PORT),
    dbUrl: process.env.DB_URL,
    ncUsername: process.env.username_NCIndia,
    ncPassword: process.env.password_NCIndia,
};
