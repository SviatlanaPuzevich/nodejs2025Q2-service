import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { compare, hash } from 'bcrypt';
import { AuthDto, TokenDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from '../users/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
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
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }
}
