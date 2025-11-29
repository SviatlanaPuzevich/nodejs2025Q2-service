import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Album } from '../albums/albums.dto';
import { FavoritesService } from './favorites.service';
import { Artist } from '../artists/artists.dto';
import { FavoritesResponse } from './favorites.dto';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites movies, tracks and books',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: FavoritesResponse,
  })
  @Get()
  getAll(): FavoritesResponse {
    return this.favoritesService.getAllFavorites();
  }

  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Artist ID (UUID v4)',
  })
  @ApiResponse({
    status: 201,
    description: 'Added successfully.',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: "Artist with id doesn't exist",
  })
  @Post('artist/:id')
  addArtistToFavotite(
    @Param('id', new ParseUUIDPipe({ version: '4' })) artistId: string,
  ) {
    return this.favoritesService.addFavArtist(artistId);
  }

  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Album ID (UUID v4)',
  })
  @ApiResponse({
    status: 201,
    description: 'Added successfully.',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: "Album with id doesn't exist",
  })
  @Post('album/:id')
  addAlbumToFavorite(
    @Param('id', new ParseUUIDPipe({ version: '4' })) albumId: string,
  ) {
    return this.favoritesService.addFavAlbum(albumId);
  }

  @ApiOperation({
    summary: 'Track album to the favorites',
    description: 'Track album to the favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Track ID (UUID v4)',
  })
  @ApiResponse({
    status: 201,
    description: 'Added successfully.',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: "Track with id doesn't exist",
  })
  @Post('track/:id')
  addTrackToFavorite(
    @Param('id', new ParseUUIDPipe({ version: '4' })) trackId: string,
  ) {
    return this.favoritesService.addFavTrack(trackId);
  }

  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Track was not found',
  })
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteFavTrack(id);
  }

  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist was not found',
  })
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteFavArtist(id);
  }

  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album was not found',
  })
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteFavAlbum(id);
  }
}
