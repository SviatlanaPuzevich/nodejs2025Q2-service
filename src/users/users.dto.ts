import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'TestUser' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'secret_password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'secret_password',
    description: "The user's old password",
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: 'secret_password2',
    description: "The user's new password",
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class ResponseUserDto {
  @Expose()
  id: string;

  @ApiProperty({ example: 'TestUser' })
  @Expose()
  login: string;

  @Exclude()
  password: string;

  @ApiProperty({ example: 1 })
  @Expose()
  version: number;

  @ApiProperty({ example: 1655000000 })
  @Expose()
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @ApiProperty({ example: 1655000000 })
  @Expose()
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;
}
