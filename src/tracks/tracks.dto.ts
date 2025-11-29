import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TrackDto {
  @ApiProperty({ example: 'The Show Must Go On' })
  @IsString()
  name: string;

  @ApiProperty({ example: 262, description: 'in seconds' })
  @IsInt()
  duration: number;

  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  @IsUUID()
  @ValidateIf((o) => o.artistId !== null)
  @IsOptional()
  artistId: string | null;

  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  @IsUUID()
  @ValidateIf((o) => o.albumId !== null)
  @IsOptional()
  albumId: string | null;
}

export class Track {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;
  @ApiProperty({ example: 'The Show Must Go On' })
  name: string;

  @ApiProperty({ example: 262 })
  duration: number;

  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  artistId: string | null;

  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  albumId: string | null;
}
