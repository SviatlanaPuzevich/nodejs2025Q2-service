import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, ResponseUserDto, UpdatePasswordDto } from './users.dto';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.prisma.user.findMany();
    return plainToInstance(ResponseUserDto, users);
  }

  async findById(id: string): Promise<ResponseUserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return plainToInstance(ResponseUserDto, user);
  }

  async createUser(dto: CreateUserDto): Promise<ResponseUserDto> {
    const now = new Date();
    const user = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: dto.password,
        createdAt: now,
        updatedAt: now,
      },
    });
    return plainToInstance(ResponseUserDto, user);
  }

  async updatePassword(
    id: string,
    userUpdateDto: UpdatePasswordDto,
  ): Promise<ResponseUserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (user.password !== userUpdateDto.oldPassword) {
      throw new ForbiddenException('Access denied');
    }
    const now = new Date();
    const updatedUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: userUpdateDto.newPassword,
        version: user.version + 1,
        updatedAt: now,
      },
    });
    return plainToInstance(ResponseUserDto, updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
