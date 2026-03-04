import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DatabaseModule } from '../db/database.module';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [DatabaseModule],
})
export class FavoritesModule {}
