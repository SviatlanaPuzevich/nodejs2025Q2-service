import { Injectable, NotFoundException } from '@nestjs/common';
import { Album, Track } from '../types/types';
import { AlbumDto } from '../albums/albums.dto';
import { randomUUID } from 'node:crypto';
import { TrackDto } from './tracks.dto';
import { artists } from '../db/db';

export let tracks: Track[] = [
  // Album 1
  {
    id: 'a4f4a7c1-1e23-44e2-9cb2-3acccc7c81fb',
    name: 'First Light',
    artistId: '8fbf442c-52f1-4206-8731-f7d065a119c4',
    albumId: '93ce2bf7-b1fb-4f22-a64a-9bf137c551c7',
    duration: 212,
  },
  {
    id: 'beea7596-36a9-4e2b-82e8-e13dfe7d21c6',
    name: 'Sky Drift',
    artistId: '8fbf442c-52f1-4206-8731-f7d065a119c4',
    albumId: '93ce2bf7-b1fb-4f22-a64a-9bf137c551c7',
    duration: 188,
  },

  // Album 2
  {
    id: 'efba7b42-2cf7-4f43-9341-c526e02e5dd6',
    name: 'Burning Path',
    artistId: 'd52e62c6-bb10-48ca-8c64-826ffba7ddfb',
    albumId: '8b366119-6154-4806-afbb-3f83a25d816f',
    duration: 244,
  },
  {
    id: '5efae24c-3cc1-486c-b79b-09f0deb39f29',
    name: 'Echoes of Fire',
    artistId: 'd52e62c6-bb10-48ca-8c64-826ffba7ddfb',
    albumId: '8b366119-6154-4806-afbb-3f83a25d816f',
    duration: 201,
  },

  // Album 3
  {
    id: '4c8ce6f0-bc9a-49ad-a8f3-a1f52ccd9127',
    name: 'Through the Smoke',
    artistId: '0f1b525f-f991-4b5d-b6c2-3acdff18d94a',
    albumId: '363091e5-b24e-4d73-b84e-c11fcb5aab32',
    duration: 175,
  },
  {
    id: '0b4633b0-bcb2-4e08-93c0-07cf11a7c45a',
    name: 'Silent Ember',
    artistId: '0f1b525f-f991-4b5d-b6c2-3acdff18d94a',
    albumId: '363091e5-b24e-4d73-b84e-c11fcb5aab32',
    duration: 226,
  },

  // Album 4
  {
    id: 'e35c7cbd-3df3-4a4d-b715-b4919c9b5e13',
    name: 'Golden Waves',
    artistId: 'dfb45605-83ad-4bca-8b17-a6d209f1bd9b',
    albumId: '0f998c89-bef4-4f3f-b2d1-8878fcb72154',
    duration: 193,
  },
  {
    id: 'de03cd16-14e9-4639-be63-bc73b4bc6765',
    name: 'Sunrise Dreams',
    artistId: 'dfb45605-83ad-4bca-8b17-a6d209f1bd9b',
    albumId: '0f998c89-bef4-4f3f-b2d1-8878fcb72154',
    duration: 207,
  },

  // Album 5
  {
    id: 'c1ae91c7-4f32-4c73-9c1b-ad373cec4a4c',
    name: 'Falling Stars',
    artistId: '124b88fa-b7d5-4c52-ab8a-a0b8249e0e1f',
    albumId: '184e7451-c964-4ff2-a01d-bc168f5e0e19',
    duration: 199,
  },
  {
    id: '0bc20458-e6d4-4bb7-953e-7d2ce49963cf',
    name: 'Night Horizon',
    artistId: '124b88fa-b7d5-4c52-ab8a-a0b8249e0e1f',
    albumId: '184e7451-c964-4ff2-a01d-bc168f5e0e19',
    duration: 241,
  },

  // Album 6
  {
    id: '96b76c52-f303-42ab-acfe-60214eb3fa82',
    name: 'Lost in Shadow',
    artistId: 'c80c8d18-6cca-480d-bbd1-61c1024c6d16',
    albumId: '7e45f3d7-1a58-4ed5-b62c-c2fb958f60c7',
    duration: 180,
  },
  {
    id: '2a3b3b70-4436-4204-9550-7c6c3802d931',
    name: 'Cold Steps',
    artistId: 'c80c8d18-6cca-480d-bbd1-61c1024c6d16',
    albumId: '7e45f3d7-1a58-4ed5-b62c-c2fb958f60c7',
    duration: 232,
  },
];

@Injectable()
export class TracksService {
  findAll(): Track[] {
    return tracks;
  }

  findById(id: string): Track {
    const track: Track | undefined = tracks.find((t) => t.id === id);
    if (!track) {
      new NotFoundException(`Track '${id}' not found`);
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
    let track = this.findById(id);
    track = { ...track, ...dto };
    return track;
  }

  deleteTrack(id: string): void {
    const index = tracks.findIndex((t) => t.id == id);
    if (index === -1) {
      throw new NotFoundException(`Track '${id}' not found`);
    }
    tracks.splice(index, 1);
  }

  deleteTracksByAlbumId(albumId: string): void {
    const ids = tracks.filter((t) => t.albumId !== albumId).map((t) => t.id);
    ids.forEach((id) => {
      const index = tracks.findIndex((t) => t.id == id);
      if (index !== -1) {
        tracks.splice(index, 1);
      }
    });
  }

  deleteTracksByArtistId(artistId: string): void {
    const ids = tracks.filter((t) => t.albumId !== artistId).map((t) => t.id);
    ids.forEach((id) => {
      const index = tracks.findIndex((t) => t.id == id);
      if (index !== -1) {
        tracks.splice(index, 1);
      }
    });
  }
}
