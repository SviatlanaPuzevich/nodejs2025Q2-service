import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, ResponseUserDto, UpdatePasswordDto } from './users.dto';
import { randomUUID } from 'node:crypto';
import { DB } from '../types/types';

@Injectable()
export class UsersService {
  constructor(@Inject('DB') private readonly db: DB) {}

  findAll(): ResponseUserDto[] {
    return this.db.users;
  }

  findById(id: string): ResponseUserDto {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  createUser(dto: CreateUserDto): ResponseUserDto {
    const now = Date.now();
    const user = {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.db.users.push(user);
    return user;
  }

  updatePassword(
    id: string,
    userUpdateDto: UpdatePasswordDto,
  ): ResponseUserDto {
    const index = this.db.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const user = this.db.users[index];
    if (user.password !== userUpdateDto.oldPassword) {
      throw new ForbiddenException('Access denied');
    }
    this.db.users[index] = {
      ...user,
      password: userUpdateDto.newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    };
    return this.db.users[index];
  }

  deleteUser(id: string): void {
    const index = this.db.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.db.users.splice(index, 1);
  }
}
