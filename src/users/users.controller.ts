import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ResponseUserDto, UpdatePasswordDto } from './users.dto';
import { plainToInstance } from 'class-transformer';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAllUsers(): ResponseUserDto[] {
    return plainToInstance(ResponseUserDto, this.usersService.findAll());
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): ResponseUserDto {
    return plainToInstance(ResponseUserDto, this.usersService.findById(id));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  createUser(@Body() dto: CreateUserDto): ResponseUserDto {
    return plainToInstance(ResponseUserDto, this.usersService.createUser(dto));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdatePasswordDto,
  ): ResponseUserDto {
    return plainToInstance(
      ResponseUserDto,
      this.usersService.updatePassword(id, dto),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.deleteUser(id);
  }
}
