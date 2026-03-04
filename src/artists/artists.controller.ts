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
import { Artist, ArtistDto } from './artists.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @ApiOperation({ summary: 'Get all artists', description: 'Gets all artists' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Artist,
    isArray: true,
  })
  @Get()
  getAllArtists() {
    return this.artistService.findAll();
  }

  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Get single artist by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Artist ID (UUID v4)',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  @Get(':id')
  getArtistById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.findById(id);
  }

  @ApiOperation({
    summary: 'Create artist',
    description: 'Creates a new artist',
  })
  @ApiBody({ type: ArtistDto })
  @ApiResponse({
    status: 201,
    description: 'The artist has been created.',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields',
  })
  @Post()
  createArtist(@Body() createArtistDto: ArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update library artist information by UUID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Artist ID (UUID v4)',
  })
  @ApiBody({ type: ArtistDto })
  @ApiResponse({
    status: 200,
    description: 'The artist has been updated',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: ArtistDto,
  ) {
    return this.artistService.updateArtist(id, dto);
  }

  @ApiOperation({
    summary: 'Delete artist',
    description: 'Deletes artist by ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'Artist ID (UUID v4)',
  })
  @ApiResponse({
    status: 204,
    description: 'The artist has been deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.deleteArtist(id);
  }
}
