import { forwardRef, Module } from '@nestjs/common';
import { UsersDatabaseModule } from '../config/database.module';
import { HashingModule } from '@backend/hashing';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { AuthResolver } from '../auth/auth.resolver';
import { UserDto } from './dto/user.dto';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    UsersDatabaseModule,
    HashingModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
      resolvers: [
        {
          DTOClass: UserDto,
          EntityClass: UserEntity,
          pagingStrategy: PagingStrategies.NONE,
          create: { disabled: true },
          update: { disabled: true },
        },
      ],
    }),
  ],
  providers: [UsersService, AuthResolver],
  exports: [UsersService],
})
export class UsersModule {}