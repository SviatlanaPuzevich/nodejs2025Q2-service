import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Artist } from '../artists/artists.dto';
import { Album } from '../albums/albums.dto';
import { Track } from '../tracks/tracks.dto';
import { FavoritesResponse } from './favorites.dto';
import { DB } from '../types/types';

@Injectable()
export class FavoritesService {
  constructor(@Inject('DB') private readonly db: DB) {}

  getAllFavorites(): FavoritesResponse {
    const favArtist = this.db.artists.filter((artist) =>
      this.db.favArtists.has(artist.id),
    );
    const favTrack = this.db.tracks.filter((track) =>
      this.db.favTracks.has(track.id),
    );
    const favAlbum = this.db.albums.filter((album) =>
      this.db.favAlbums.has(album.id),
    );
    return {
      artists: favArtist,
      albums: favAlbum,
      tracks: favTrack,
    };
  }

  addFavArtist(artistId: string): Artist {
    const artist: Artist = this.db.artists.find((a) => a.id === artistId);
    if (!artist) {
      throw new UnprocessableEntityException('Such artist does not exist');
    }
    this.db.favArtists.add(artistId);
    return artist;
  }

  addFavAlbum(albumId: string): Album {
    const album: Album = this.db.albums.find((a) => a.id === albumId);
    if (!album) {
      throw new UnprocessableEntityException('Such album does not exist');
    }
    this.db.favAlbums.add(albumId);
    return album;
  }

  addFavTrack(trackId: string): Track {
    const track: Track = this.db.tracks.find((t) => t.id === trackId);
    if (!track) {
      throw new UnprocessableEntityException('Such track does not exist');
    }
    this.db.favTracks.add(trackId);
    return track;
  }

  deleteFavTrack(trackId: string): void {
    if (!this.db.favTracks.has(trackId)) {
      throw new NotFoundException('Track is not found');
    }
    this.db.favTracks.delete(trackId);
  }

  deleteFavAlbum(albumId: string): void {
    if (!this.db.favAlbums.has(albumId)) {
      throw new NotFoundException('Album is not found');
    }
    this.db.favAlbums.delete(albumId);
  }

  deleteFavArtist(artistId: string): void {
    if (!this.db.favArtists.has(artistId)) {
      throw new NotFoundException('Artist not found');
    }
    this.db.favArtists.delete(artistId);
  }
}
