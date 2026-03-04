import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_REFRESH } from '../constants';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET_REFRESH_KEY'),
        signOptions: {
          expiresIn: config.getOrThrow('TOKEN_REFRESH_EXPIRE_TIME'),
        },
      }),
    }),
  ],
  providers: [
    {
      provide: JWT_REFRESH,
      useExisting: JwtService,
    },
  ],
  exports: [JWT_REFRESH],
})
export class RefreshJwtModule {}
