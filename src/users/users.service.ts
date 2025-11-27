import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../types/types';
import { CreateUserDto, UpdatePasswordDto } from './users.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: '7c2b5ad4-4a2a-44d2-a8e7-e083d2de55c1',
      login: 'alex_dev',
      password: 'qwerty123',
      version: 1,
      createdAt: 1732531200000,
      updatedAt: 1732531200000,
    },
    {
      id: 'e02afbc1-7f2f-4ab0-8cb8-44a6d56b4c70',
      login: 'maria92',
      password: 'pass456',
      version: 1,
      createdAt: 1732544800000,
      updatedAt: 1732544800000,
    },
    {
      id: '9fe2d34a-a87c-42b0-9abf-71541c1c2fe3',
      login: 'john_smith',
      password: 'john123',
      version: 1,
      createdAt: 1732558400000,
      updatedAt: 1732558400000,
    },
    {
      id: '3a5d80be-6c0a-4af4-9a9b-f5dcda3a5cb9',
      login: 'kate_admin',
      password: 'admin789',
      version: 1,
      createdAt: 1732572000000,
      updatedAt: 1732572000000,
    },
    {
      id: 'c88e78bd-b21c-47e2-a1df-1d38778ce24b',
      login: 'nikita',
      password: '12345',
      version: 1,
      createdAt: 1732585600000,
      updatedAt: 1732585600000,
    },
    {
      id: '41e5b7f7-df00-4131-b43e-359d802607e1',
      login: 'sasha',
      password: 'test123',
      version: 1,
      createdAt: 1732599200000,
      updatedAt: 1732599200000,
    },
    {
      id: '1c7a63ea-0f30-4f1b-a6ad-0d0ff715cfc4',
      login: 'developer_one',
      password: 'dev111',
      version: 1,
      createdAt: 1732612800000,
      updatedAt: 1732612800000,
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    const user = this.users.find((user) => user.id === id);
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
    this.users.push(user);
    return user;
  }

  updatePassword(id: string, userUpdateDto: UpdatePasswordDto): User {
    const user = this.findById(id);
    if (user.password !== userUpdateDto.oldPassword) {
      throw new ForbiddenException('Access denied');
    }
    user.updatedAt = Date.now();
    user.version = user.version + 1;
    user.password = userUpdateDto.newPassword;
    return user;
  }

  deleteUser(id: string): void {
    const existingUser = this.findById(id);
    this.users = this.users.filter((user) => user.id !== existingUser.id);
  }
}
