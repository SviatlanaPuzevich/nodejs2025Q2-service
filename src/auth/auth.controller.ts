import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, ResponseUserDto } from '../users/users.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@ApiTags('Signup')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Signup', description: 'Signup a user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 204,
    description: 'Successful signup',
    type: ResponseUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict. Login already exists',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async signIn(@Body() dto: AuthDto): Promise<void> {
    return await this.authService.signIn(dto);
  }

  @ApiOperation({
    summary: 'Login',
    description: 'Logins a user and returns a JWT-token',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
  })
  @ApiResponse({
    status: 403,
    description: 'Incorrect login or password',
  })
  @Post()
  async login(@Body() dto: AuthDto): Promise<string> {
    return await this.authService.loginIn(dto);
  }
}
