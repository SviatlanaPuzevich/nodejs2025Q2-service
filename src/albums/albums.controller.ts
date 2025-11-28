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
import { AlbumDto } from './albums.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @Get()
  getAllArtists() {
    return this.albumService.findAll();
  }

  @Get()
  getArtistById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.findById(id);
  }

  @Post()
  createArtist(@Body() dto: AlbumDto) {
    return this.albumService.createAlbum(dto);
  }

  @Put()
  updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: AlbumDto,
  ) {
    return this.albumService.updateAlbum(id, dto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
