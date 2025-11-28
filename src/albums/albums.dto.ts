import { IsInt, IsString, IsUUID } from 'class-validator';

export class AlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsUUID()
  artistId: string;
}
