import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, ResponseUserDto } from '../users/users.dto';
import { AuthService } from './auth.service';
import { AuthDto, TokenDto } from './auth.dto';
import { Public } from './decorators/public.decorator';

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
  @Public()
  @Post('signup')
  async signIn(@Body() dto: AuthDto): Promise<ResponseUserDto> {
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
  @Public()
  @Post('login')
  async login(@Body() dto: AuthDto): Promise<TokenDto> {
    return await this.authService.loginIn(dto);
  }
}
