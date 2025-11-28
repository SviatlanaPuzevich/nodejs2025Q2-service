import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}

export class ResponseUserDto {
  @Expose()
  id: string;

  @Expose()
  login: string;

  @Exclude()
  password: string;

  @Expose()
  version: number;

  @Expose()
  createdAt: number;

  @Expose()
  updatedAt: number;
}
