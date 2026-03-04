import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist, ArtistDto } from './artists.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async findById(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({
      where: { id: id },
    });
    if (!artist) {
      throw new NotFoundException(`Artist '${id}' not found`);
    }
    return artist;
  }

  async createArtist(dto: ArtistDto): Promise<Artist> {
    return this.prisma.artist.create({
      data: dto,
    });
  }

  async updateArtist(id: string, dto: ArtistDto): Promise<Artist> {
    await this.findById(id);
    const artist = await this.prisma.artist.update({
      where: {
        id: id,
      },
      data: dto,
    });
    return artist;
  }

  async deleteArtist(id: string) {
    await this.findById(id);
    await this.prisma.artist.delete({
      where: {
        id: id,
      },
    });
  }
}
