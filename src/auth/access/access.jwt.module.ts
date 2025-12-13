import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_ACCESS } from '../constants';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: config.getOrThrow('TOKEN_EXPIRE_TIME'),
        },
      }),
    }),
  ],
  providers: [
    {
      provide: JWT_ACCESS,
      useExisting: JwtService,
    },
  ],
  exports: [JWT_ACCESS],
})
export class AccessJWTModule {}
