import { IsInt, IsString, IsUUID } from 'class-validator';

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export class TrackDto {
  @IsString()
  name: string;

  @IsInt()
  duration: number;

  @IsUUID()
  artistId: string;

  @IsUUID()
  albumId: string;
}
