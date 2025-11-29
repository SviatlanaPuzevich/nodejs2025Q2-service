import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { TrackDto, Track } from './tracks.dto';
import { tracks } from '../db/db';

@Injectable()
export class TracksService {
  findAll(): Track[] {
    return tracks;
  }

  findById(id: string): Track {
    const track: Track | undefined = tracks.find((t) => t.id === id);
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
    tracks.push(track);
    return track;
  }

  updateTrack(id: string, dto: TrackDto): Track {
    const index = tracks.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Track '${id}' not found`);
    }
    tracks[index] = { ...tracks[index], ...dto };
    return tracks[index];
  }

  deleteTrack(id: string): void {
    const index = tracks.findIndex((t) => t.id == id);
    if (index === -1) {
      throw new NotFoundException(`Track '${id}' not found`);
    }
    tracks.splice(index, 1);
  }

  deleteTracksByAlbumId(albumId: string): void {
    const ids = tracks.filter((t) => t.albumId === albumId).map((t) => t.id);
    ids.forEach((id) => {
      const index = tracks.findIndex((t) => t.id == id);
      if (index !== -1) {
        tracks[index] = { ...tracks[index], albumId: null };
      }
    });
  }

  deleteTracksByArtistId(artistId: string): void {
    const ids = tracks.filter((t) => t.artistId === artistId).map((t) => t.id);
    ids.forEach((id) => {
      const index = tracks.findIndex((t) => t.id == id);
      if (index !== -1) {
        tracks[index] = { ...tracks[index], artistId: null };
      }
    });
  }
}
