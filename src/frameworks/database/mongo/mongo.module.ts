import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model';
import { MongoDatabaseService } from './mongo-database.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IDatabaseService } from 'src/core/abstracts/services/database-services.abstract';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        user: configService.get('MONGODB_USER'),
        pass: configService.get('MONGODB_PASS'),
        dbName: configService.get('MONGODB_DB'),
      }),
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: IDatabaseService,
      useClass: MongoDatabaseService,
    },
  ],
  exports: [
    {
      provide: IDatabaseService,
      useClass: MongoDatabaseService,
    },
  ],
})
export class MongoDatabaseServiceModule {}
