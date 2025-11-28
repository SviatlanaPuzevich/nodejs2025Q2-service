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
import { TracksService } from './tracks.service';
import { TrackDto } from './tracks.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Get()
  getAllTracks() {
    return this.trackService.findAll();
  }

  @Get()
  getTrackById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.findById(id);
  }

  @Post()
  createArtist(@Body() dto: TrackDto) {
    return this.trackService.createTrack(dto);
  }

  @Put()
  updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: TrackDto,
  ) {
    return this.trackService.updateTrack(id, dto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.deleteTrack(id);
  }
}
