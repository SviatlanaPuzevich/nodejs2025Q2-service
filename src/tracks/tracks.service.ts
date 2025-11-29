import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Track, TrackDto } from './tracks.dto';
import { DB } from '../types/types';

@Injectable()
export class TracksService {
  constructor(@Inject('DB') private readonly db: DB) {}

  findAll(): Track[] {
    return this.db.tracks;
  }

  findById(id: string): Track {
    const track: Track | undefined = this.db.tracks.find((t) => t.id === id);
    if (!track) {
      throw new NotFoundException(`Track '${id}' not found`);
    }
    return track;
  }

  createTrack(dto: TrackDto): Track {
    const track: Track = {
      id: randomUUID(),
      ...dto,
    };
    this.db.tracks.push(track);
    return track;
  }

  updateTrack(id: string, dto: TrackDto): Track {
    const index = this.db.tracks.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Track '${id}' not found`);
    }
    this.db.tracks[index] = { ...this.db.tracks[index], ...dto };
    return this.db.tracks[index];
  }

  deleteTrack(id: string): void {
    const index = this.db.tracks.findIndex((t) => t.id == id);
    if (index === -1) {
      throw new NotFoundException(`Track '${id}' not found`);
    }
    this.db.tracks.splice(index, 1);
  }

  deleteTracksByAlbumId(albumId: string): void {
    const ids = this.db.tracks
      .filter((t) => t.albumId === albumId)
      .map((t) => t.id);
    ids.forEach((id) => {
      const index = this.db.tracks.findIndex((t) => t.id == id);
      if (index !== -1) {
        this.db.tracks[index] = { ...this.db.tracks[index], albumId: null };
      }
    });
  }

  deleteTracksByArtistId(artistId: string): void {
    const ids = this.db.tracks
      .filter((t) => t.artistId === artistId)
      .map((t) => t.id);
    ids.forEach((id) => {
      const index = this.db.tracks.findIndex((t) => t.id == id);
      if (index !== -1) {
        this.db.tracks[index] = { ...this.db.tracks[index], artistId: null };
      }
    });
  }
}
