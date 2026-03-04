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
import { Track, TrackDto } from './tracks.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @ApiOperation({ summary: 'Get all tracks', description: 'Gets all tracks' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Track,
    isArray: true,
  })
  @Get()
  getAllTracks() {
    return this.trackService.findAll();
  }

  @ApiOperation({
    summary: 'Get single track by id',
    description: 'Get single track by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Track ID (UUID v4)',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  @Get(':id')
  getTrackById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.findById(id);
  }

  @ApiOperation({
    summary: 'Create track',
    description: 'Creates a new track',
  })
  @ApiBody({ type: TrackDto })
  @ApiResponse({
    status: 201,
    description: 'The track has been created.',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields',
  })
  @Post()
  createArtist(@Body() dto: TrackDto) {
    return this.trackService.createTrack(dto);
  }

  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Track ID (UUID v4)',
  })
  @ApiBody({ type: TrackDto })
  @ApiResponse({
    status: 200,
    description: 'The track has been updated',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: TrackDto,
  ) {
    return this.trackService.updateTrack(id, dto);
  }

  @ApiOperation({
    summary: 'Delete track',
    description: 'Deletes track by ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Track ID (UUID v4)',
  })
  @ApiResponse({
    status: 204,
    description: 'The track has been deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.deleteTrack(id);
  }
}
