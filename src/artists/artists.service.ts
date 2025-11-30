import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto, Artist } from './artists.dto';
import { randomUUID } from 'node:crypto';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { DB } from '../types/types';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly tracksService: TracksService,
    private readonly albumService: AlbumsService,
    @Inject('DB') private readonly db: DB,
  ) {}

  findAll(): Artist[] {
    return this.db.artists;
  }

  findById(id: string): Artist {
    const artist: Artist | undefined = this.db.artists.find((a) => a.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist '${id}' not found`);
    }
    return artist;
  }

  createArtist(dto: ArtistDto): Artist {
    const artist: Artist = {
      id: randomUUID(),
      ...dto,
    };
    this.db.artists.push(artist);
    return artist;
  }

  updateArtist(id: string, dto: ArtistDto): Artist {
    const index = this.db.artists.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Artist '${id}' not found`);
    }
    if (this.db.favArtists.has(id)) {
      this.db.favArtists.delete(id);
    }
    this.db.artists[index] = { ...this.db.artists[index], ...dto };
    return this.db.artists[index];
  }

  deleteArtist(id: string) {
    const index = this.db.artists.findIndex((a) => a.id == id);
    if (index === -1) {
      throw new NotFoundException(`Artist '${id}' not found`);
    }
    this.albumService.deleteAlbumsByArtist(id);
    this.tracksService.deleteTracksByArtistId(id);
    this.db.artists.splice(index, 1);
  }
}
