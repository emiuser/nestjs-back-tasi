import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    /** Export all environment variables */
    return {
        devEnvironment: process.env.DEVELOP_ENV,
        enabledEnvironment: process.env.ENABLED_ENVIRONMENT,
        devAuth: process.env.AUTH_DEV,
        mongo: {
            dbName: process.env.MONGO_DB,
            user: process.env.MONGO_INITDB_ROOT_USERNAME,
            password: process.env.MONGO_INITDB_ROOT_PASSWORD,
            port: parseInt(process.env.MONGO_PORT, 10),
            host: process.env.MONGO_HOST,
            connection: process.env.MONGO_CONNECTION,
        },
    };
});
