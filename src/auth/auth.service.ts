import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { compare, hash } from 'bcrypt';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(authDto: AuthDto): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: {
        login: authDto.login,
      },
    });
    if (user) {
      throw new ConflictException(`User with login ${authDto.login} exists`);
    }
    const now = new Date();
    const salt = this.configService.get<string>('CRYPT_SALT');
    const hashPassword = await hash(authDto.password, salt);
    await this.prisma.user.create({
      data: {
        login: authDto.login,
        password: hashPassword,
        createdAt: now,
        updatedAt: now,
      },
    });
  }

  async loginIn(authDto: AuthDto): Promise<string> {
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
    const passwordIsCorrect = await compare(user.password, authDto.password);
    if (passwordIsCorrect) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { userId: user.id, login: user.login };
    return await this.jwtService.signAsync(payload);
  }
}
