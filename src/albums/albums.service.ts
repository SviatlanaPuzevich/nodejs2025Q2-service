import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AlbumDto, Album } from './albums.dto';
import { TracksService } from '../tracks/tracks.service';
import { DB } from '../types/types';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly tracksService: TracksService,
    @Inject('DB') private readonly db: DB,
  ) {}

  findAll(): Album[] {
    return this.db.albums;
  }

  findById(id: string): Album {
    const album: Album | undefined = this.db.albums.find((a) => a.id === id);
    if (!album) {
      throw new NotFoundException(`Album '${id}' not found`);
    }
    return album;
  }

  createAlbum(dto: AlbumDto): Album {
    const album: Album = {
      id: randomUUID(),
      ...dto,
    };
    this.db.albums.push(album);
    return album;
  }

  updateAlbum(id: string, dto: AlbumDto): Album {
    const index = this.db.albums.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Album '${id}' not found`);
    }
    this.db.albums[index] = { ...this.db.albums[index], ...dto };
    return this.db.albums[index];
  }

  deleteAlbum(id: string): void {
    const index = this.db.albums.findIndex((a) => a.id === id);
    if (index == -1) {
      throw new NotFoundException(`Album '${id}' not found`);
    }
    this.tracksService.deleteTracksByAlbumId(id);
    if (this.db.favAlbums.has(id)) {
      this.db.favAlbums.delete(id);
    }
    this.db.albums.splice(index, 1);
  }

  deleteAlbumsByArtist(artistId: string): void {
    const ids = this.db.albums
      .filter((a) => a.artistId === artistId)
      .map((a) => a.id);
    ids.forEach((id) => {
      const index = this.db.albums.findIndex((a) => a.id === id);
      if (index !== -1) {
        this.tracksService.deleteTracksByAlbumId(id);
        this.db.albums[index] = { ...this.db.albums[index], artistId: null };
      }
    });
  }
}
