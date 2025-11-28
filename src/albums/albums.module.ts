import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [TracksModule],
  exports: [AlbumsService],
})
export class AlbumsModule {}
