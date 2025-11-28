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
import { ArtistsService } from './artists.service';
import { CreateArtistDto, UpdateArtistDto } from './artists.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Get()
  getAllArtists() {
    return this.artistService.findAll();
  }

  @Get()
  getArtistById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.findById(id);
  }

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put()
  updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.deleteArtist(id);
  }
}
