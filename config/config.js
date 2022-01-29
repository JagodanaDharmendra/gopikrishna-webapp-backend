exports.config = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URI,
    APP_SECRET: process.env.APP_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
};