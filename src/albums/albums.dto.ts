import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AlbumDto {
  @ApiProperty({ example: 'Innuendo' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1991 })
  @IsInt()
  year: number;

  @ApiProperty()
  @IsUUID()
  @ValidateIf((o) => o.artistId !== null)
  @IsOptional()
  artistId: string | null;
}

export class Album {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;
  @ApiProperty({ example: 'Innuendo' })
  name: string;
  @ApiProperty({ example: 1991 })
  year: number;
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  artistId: string | null;
}
