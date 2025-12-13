import { Injectable, NotFoundException } from '@nestjs/common';
import { Track, TrackDto } from './tracks.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async findById(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({
      where: { id: id },
    });
    if (!track) {
      throw new NotFoundException(`Track '${id}' not found`);
    }
    return track;
  }

  async createTrack(dto: TrackDto): Promise<Track> {
    return this.prisma.track.create({
      data: dto,
    });
  }

  async updateTrack(id: string, dto: TrackDto): Promise<Track> {
    await this.findById(id);
    return this.prisma.track.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async deleteTrack(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.track.delete({
      where: { id: id },
    });
  }
}
