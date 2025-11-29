import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { DatabaseModule } from '../db/database.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [AlbumsModule, TracksModule, DatabaseModule],
})
export class ArtistsModule {}
