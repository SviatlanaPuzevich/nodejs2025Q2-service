import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessJWTModule } from './access/access.jwt.module';
import { RefreshJwtModule } from './refresh/refresh.jwt.module';

@Module({
  imports: [AccessJWTModule, RefreshJwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
