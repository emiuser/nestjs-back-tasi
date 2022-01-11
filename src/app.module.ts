import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/** Config and environments */
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { environmentsFiles } from './env.variables';
import { EnvironmentGuard } from './environment.guard';

/** Database and Schemas */
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './entities/user.entity';

@Module({
    imports: [
        DatabaseModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: environmentsFiles[process.env.NODE_ENV] || '.env',
            load: [config],
        }),

        //'mongodb://localhost:27017/tasi'
        MongooseModule.forFeature([
            {
                name: UserModel.name,
                schema: UserSchema,
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService, EnvironmentGuard],
})
export class AppModule {}
