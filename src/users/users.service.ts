import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../types/types';
import { CreateUserDto, UpdatePasswordDto } from './users.dto';
import { randomUUID } from 'node:crypto';
import { users } from '../db/db';

@Injectable()
export class UsersService {
  findAll(): User[] {
    return users;
  }

  findById(id: string): User {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  createUser(dto: CreateUserDto): User {
    const now = Date.now();
    const user = {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    users.push(user);
    return user;
  }

  updatePassword(id: string, userUpdateDto: UpdatePasswordDto): User {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const user = users[index];
    if (user.password !== userUpdateDto.oldPassword) {
      throw new ForbiddenException('Access denied');
    }
    users[index] = {
      ...user,
      password: userUpdateDto.newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    };
    return users[index];
  }

  deleteUser(id: string): void {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    users.splice(index, 1);
  }
}
