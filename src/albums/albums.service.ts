import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '../types/types';
import { randomUUID } from 'node:crypto';
import { AlbumDto } from './albums.dto';
import { albums } from '../db/db';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly tracksService: TracksService) {}

  findAll(): Album[] {
    return albums;
  }

  findById(id: string): Album {
    const album: Album | undefined = albums.find((a) => a.id === id);
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
    albums.push(album);
    return album;
  }

  updateAlbum(id: string, dto: AlbumDto): Album {
    const index = albums.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Album '${id}' not found`);
    }
    albums[index] = { ...albums[index], ...dto };
    return albums[index];
  }

  deleteAlbum(id: string): void {
    const index = albums.findIndex((a) => a.id === id);
    if (index == -1) {
      throw new NotFoundException(`Album '${id}' not found`);
    }
    this.tracksService.deleteTracksByAlbumId(id);
    albums.splice(index, 1);
  }

  deleteAlbumsByArtist(artistId: string): void {
    const ids = albums.filter((a) => a.artistId === artistId).map((a) => a.id);
    ids.forEach((id) => {
      const index = albums.findIndex((a) => a.id === id);
      if (index !== -1) {
        this.tracksService.deleteTracksByAlbumId(id);
        albums[index] = { ...albums[index], artistId: null };
      }
    });
  }
}
