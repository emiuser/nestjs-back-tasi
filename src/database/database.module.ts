import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import config from '../config';

@Global()
@Module({
    imports: [
        /** Mongoose library connection */
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigType<typeof config>) => {
                const { connection, user, password, host, port, dbName } =
                    configService.mongo;
                return {
                    uri: `${connection}://${host}:${port}/${dbName}`,
                    user,
                    pass: password,
                    dbName,
                };
            },
            inject: [config.KEY],
        }),
    ],
    providers: [
        {
            /** Mongo DB Connection */
            provide: 'MONGO',
            useFactory: async (configService: ConfigType<typeof config>) => {
                const { connection, user, password, host, port, dbName } =
                    configService.mongo;
                const urlProd = `${connection}://${user}:${password}@${host}:${port}/${dbName}`;
                const urlDesa = `${connection}://${host}:${port}/${dbName}`;

                const client = new MongoClient(
                    process.env.NODE_ENV === 'prod' ? urlProd : urlDesa,
                );
                await client.connect();
                const database = client.db(dbName);
                console.log('db: ', database, client);
                return database;
            },
            inject: [config.KEY],
        },
    ],
    exports: [MongooseModule, 'MONGO'],
})
export class DatabaseModule {}
