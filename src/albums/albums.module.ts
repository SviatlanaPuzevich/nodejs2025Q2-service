import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TracksModule } from '../tracks/tracks.module';
import { DatabaseModule } from '../db/database.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [TracksModule, DatabaseModule],
  exports: [AlbumsService],
})
export class AlbumsModule {}
