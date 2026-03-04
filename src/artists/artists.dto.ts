import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArtistDto {
  @ApiProperty({ example: 'Freddie Mercury' })
  @IsString()
  name: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  grammy: boolean;
}

export class Artist {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;
  @ApiProperty({ example: 'Freddie Mercury' })
  name: string;
  @ApiProperty({ example: false })
  grammy: boolean;
}
