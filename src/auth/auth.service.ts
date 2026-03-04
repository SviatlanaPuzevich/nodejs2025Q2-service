import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { AuthDto, RefreshTokenDto, TokenDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from '../users/users.dto';
import { JWT_ACCESS, JWT_REFRESH } from './constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject(JWT_ACCESS)
    private readonly jwtAccessService: JwtService,
    @Inject(JWT_REFRESH)
    private readonly jwtRefreshService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(authDto: AuthDto): Promise<ResponseUserDto> {
    const user = await this.prisma.user.findFirst({
      where: {
        login: authDto.login,
      },
    });
    if (user) {
      throw new ConflictException(`User with login ${authDto.login} exists`);
    }
    const now = new Date();
    const salt = this.configService.get<number>('CRYPT_SALT');
    const hashPassword = await hash(authDto.password, Number(salt));
    const createdUser = await this.prisma.user.create({
      data: {
        login: authDto.login,
        password: hashPassword,
        createdAt: now,
        updatedAt: now,
      },
    });
    return plainToInstance(ResponseUserDto, createdUser);
  }

  async loginIn(authDto: AuthDto): Promise<TokenDto> {
    const user = await this.prisma.user.findFirst({
      where: {
        login: authDto.login,
      },
    });
    if (!user) {
      throw new NotFoundException(
        `User with login ${authDto.login} does not exist`,
      );
    }
    const passwordIsCorrect = await compare(authDto.password, user.password);
    if (!passwordIsCorrect) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { userId: user.id, login: user.login };
    const accessToken = await this.jwtAccessService.signAsync(payload);
    const refreshToken = await this.jwtRefreshService.signAsync(payload);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(dto: RefreshTokenDto): Promise<TokenDto> {
    if (!dto || !dto.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    try {
      const { userId, login } = await this.jwtRefreshService.verifyAsync(
        dto.refreshToken,
      );
      const accessToken = await this.jwtAccessService.signAsync({
        userId,
        login,
      });
      const updatedRefreshToken = await this.jwtRefreshService.signAsync({
        userId,
        login,
      });
      return {
        accessToken,
        refreshToken: updatedRefreshToken,
      };
    } catch (e) {
      throw new ForbiddenException('Refresh token failed');
    }
  }
}
