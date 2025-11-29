import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Artist } from '../artists/artists.dto';
import {
  albums,
  artists,
  favAlbums,
  favArtists,
  favTracks,
  tracks,
} from '../db/db';
import { Album } from '../albums/albums.dto';
import { Track } from '../tracks/tracks.dto';
import { FavoritesResponse } from './favorites.dto';

@Injectable()
export class FavoritesService {
  getAllFavorites(): FavoritesResponse {
    const favArtist = artists.filter((artist) => favArtists.has(artist.id));
    const favTrack = tracks.filter((track) => favTracks.has(track.id));
    const favAlbum = albums.filter((album) => favAlbums.has(album.id));
    return {
      artists: favArtist,
      albums: favAlbum,
      tracks: favTrack,
    };
  }

  addFavArtist(artistId: string): Artist {
    const artist: Artist = artists.find((a) => a.id === artistId);
    if (!artist) {
      throw new UnprocessableEntityException('Such artist does not exist');
    }
    favArtists.add(artistId);
    return artist;
  }

  addFavAlbum(albumId: string): Album {
    const album: Album = albums.find((a) => a.id === albumId);
    if (!album) {
      throw new UnprocessableEntityException('Such album does not exist');
    }
    favAlbums.add(albumId);
    return album;
  }

  addFavTrack(trackId: string): Track {
    const track: Track = tracks.find((t) => t.id === trackId);
    if (!track) {
      throw new UnprocessableEntityException('Such track does not exist');
    }
    favTracks.add(trackId);
    return track;
  }

  deleteFavTrack(trackId: string): void {
    if (!favTracks.has(trackId)) {
      throw new NotFoundException('Track is not found');
    }
    favTracks.delete(trackId);
  }

  deleteFavAlbum(albumId: string): void {
    if (!favAlbums.has(albumId)) {
      throw new NotFoundException('Album is not found');
    }
    favAlbums.delete(albumId);
  }

  deleteFavArtist(artistId: string): void {
    if (!favArtists.has(artistId)) {
      throw new NotFoundException('Artist not found');
    }
    favArtists.delete(artistId);
  }
}
