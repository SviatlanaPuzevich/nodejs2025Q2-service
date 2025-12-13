import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Artist } from '../artists/artists.dto';
import { Album } from '../albums/albums.dto';
import { Track } from '../tracks/tracks.dto';
import { FavoritesResponse } from './favorites.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getAllFavorites(): Promise<FavoritesResponse> {
    const favArtist = await this.prisma.favoriteArtist.findMany({
      include: {
        artist: true,
      },
      omit: {
        artistId: true,
      },
    });
    const favTrack = await this.prisma.favoriteTrack.findMany({
      include: {
        track: true,
      },
      omit: {
        trackId: true,
      },
    });
    const favAlbum = await this.prisma.favoriteAlbum.findMany({
      include: {
        album: true,
      },
    });
    return {
      artists: favArtist.map((f) => f.artist),
      albums: favAlbum.map((f) => f.album),
      tracks: favTrack.map((f) => f.track),
    };
  }

  async addFavArtist(artistId: string): Promise<Artist> {
    const artist = await this.prisma.artist.findFirst({
      where: { id: artistId },
    });
    if (!artist) {
      throw new UnprocessableEntityException('Such artist does not exist');
    }
    await this.prisma.favoriteArtist.create({
      data: {
        artistId: artistId,
      },
    });
    return artist;
  }

  async addFavAlbum(albumId: string): Promise<Album> {
    const album = await this.prisma.album.findFirst({
      where: { id: albumId },
    });
    if (!album) {
      throw new UnprocessableEntityException('Such album does not exist');
    }
    await this.prisma.favoriteAlbum.create({
      data: {
        albumId: albumId,
      },
    });
    return album;
  }

  async addFavTrack(trackId: string): Promise<Track> {
    const track = await this.prisma.track.findFirst({
      where: { id: trackId },
    });
    if (!track) {
      throw new UnprocessableEntityException('Such track does not exist');
    }
    await this.prisma.favoriteTrack.create({
      data: {
        trackId: trackId,
      },
    });
    return track;
  }

  async deleteFavTrack(trackId: string): Promise<void> {
    const fav = await this.prisma.favoriteTrack.findUnique({
      where: {
        trackId: trackId,
      },
    });
    if (!fav) {
      throw new NotFoundException('Track is not found');
    }
    await this.prisma.favoriteTrack.delete({
      where: {
        trackId: trackId,
      },
    });
  }

  async deleteFavAlbum(albumId: string): Promise<void> {
    const fav = await this.prisma.favoriteAlbum.findUnique({
      where: {
        albumId: albumId,
      },
    });
    if (!fav) {
      throw new NotFoundException('Album is not found');
    }
    await this.prisma.favoriteAlbum.delete({
      where: {
        albumId: albumId,
      },
    });
  }

  async deleteFavArtist(artistId: string): Promise<void> {
    const fav = await this.prisma.favoriteArtist.findUnique({
      where: {
        artistId: artistId,
      },
    });
    if (!fav) {
      throw new NotFoundException('Artist is not found');
    }
    await this.prisma.favoriteArtist.delete({
      where: {
        artistId: artistId,
      },
    });
  }
}
