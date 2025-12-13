import { Injectable, NotFoundException } from '@nestjs/common';
import { Album, AlbumDto } from './albums.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async findById(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({
      where: { id: id },
    });
    if (!album) {
      throw new NotFoundException(`Album '${id}' not found`);
    }
    return album;
  }

  async createAlbum(dto: AlbumDto): Promise<Album> {
    return this.prisma.album.create({
      data: dto,
    });
  }

  async updateAlbum(id: string, dto: AlbumDto): Promise<Album> {
    await this.findById(id);
    return this.prisma.album.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.album.delete({
      where: {
        id: id,
      },
    });
  }
}
