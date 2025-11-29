import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album, AlbumDto } from './albums.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Track } from '../tracks/tracks.dto';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @ApiOperation({ summary: 'Get all albums', description: 'Gets all albums' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Album,
    isArray: true,
  })
  @Get()
  getAllArtists() {
    return this.albumService.findAll();
  }

  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Get single user by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Album ID (UUID v4)',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  @Get(':id')
  getArtistById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.findById(id);
  }

  @ApiOperation({
    summary: 'Create album',
    description: 'Creates a new album',
  })
  @ApiBody({ type: AlbumDto })
  @ApiResponse({
    status: 201,
    description: 'The album has been created.',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields',
  })
  @Post()
  createArtist(@Body() dto: AlbumDto) {
    return this.albumService.createAlbum(dto);
  }

  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Album ID (UUID v4)',
  })
  @ApiBody({ type: AlbumDto })
  @ApiResponse({
    status: 200,
    description: 'The album has been updated',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: AlbumDto,
  ) {
    return this.albumService.updateAlbum(id, dto);
  }

  @ApiOperation({
    summary: 'Delete album',
    description: 'Deletes album by ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Album ID (UUID v4)',
  })
  @ApiResponse({
    status: 204,
    description: 'The album has been deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
