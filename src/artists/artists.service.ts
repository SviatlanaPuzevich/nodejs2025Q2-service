import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from 'src/types/types';
import { CreateArtistDto, UpdateArtistDto } from './artists.dto';
import { randomUUID } from 'node:crypto';
import { artists } from '../db/db';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly tracksService: TracksService,
    private readonly albumService: AlbumsService,
  ) {}

  findAll(): Artist[] {
    return artists;
  }

  findById(id: string): Artist {
    const artist: Artist | undefined = artists.find((a) => a.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist '${id}' not found`);
    }
    return artist;
  }

  createArtist(dto: CreateArtistDto): Artist {
    const artist: Artist = {
      id: randomUUID(),
      ...dto,
    };
    artists.push(artist);
    return artist;
  }

  updateArtist(id: string, dto: UpdateArtistDto): Artist {
    const index = artists.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Artist '${id}' not found`);
    }
    artists[index] = { ...artists[index], ...dto };
    return artists[index];
  }

  deleteArtist(id: string) {
    const index = artists.findIndex((a) => a.id == id);
    if (index === -1) {
      throw new NotFoundException(`Artist '${id}' not found`);
    }
    this.albumService.deleteAlbumsByArtist(id);
    this.tracksService.deleteTracksByArtistId(id);
    artists.splice(index, 1);
  }
}
