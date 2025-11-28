import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../types/types';
import { CreateUserDto, UpdatePasswordDto } from './users.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): User[] {
    return this.usersService.findAll();
  }

  @Get()
  getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): User {
    return this.usersService.findById(id);
  }

  @Post()
  createUser(@Body() dto: CreateUserDto): User {
    return this.usersService.createUser(dto);
  }

  @Put()
  updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(id, dto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.deleteUser(id);
  }
}
