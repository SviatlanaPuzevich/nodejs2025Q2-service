import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'TestUser' })
  @IsString()
  @Length(3, 255)
  login: string;

  @ApiProperty({ example: 'secret_password' })
  @IsString()
  @Length(3, 30)
  @Matches(/^[\S]{3,30}$/, {
    message:
      'Password must contain only letters and numbers and be 3-30 characters long',
  })
  password: string;
}

export class TokenDto {
  accessToken: string;
}
