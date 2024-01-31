import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

import { StrategiesModule } from '@backend/strategies';
import { HashingModule } from '@backend/hashing';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import {
  InternalCommunicationsModule,
  InternalCommunicationsService,
} from '@backend/internal-communications';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),

    InternalCommunicationsModule,

    ConfigModule,
    HashingModule,
    StrategiesModule,
  ],
  providers: [
    InternalCommunicationsService,

    AuthService,
    LocalStrategy,
    AuthResolver,
  ],
  controllers: [AuthController],
})
export class AuthModule {}