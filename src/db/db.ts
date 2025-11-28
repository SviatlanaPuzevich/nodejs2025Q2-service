import { Album, Artist, User } from '../types/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto } from '../albums/albums.dto';
import { randomUUID } from 'node:crypto';

export const users: User[] = [
  {
    id: '7c2b5ad4-4a2a-44d2-a8e7-e083d2de55c1',
    login: 'alex_dev',
    password: 'qwerty123',
    version: 1,
    createdAt: 1732531200000,
    updatedAt: 1732531200000,
  },
  {
    id: 'e02afbc1-7f2f-4ab0-8cb8-44a6d56b4c70',
    login: 'maria92',
    password: 'pass456',
    version: 1,
    createdAt: 1732544800000,
    updatedAt: 1732544800000,
  },
  {
    id: '9fe2d34a-a87c-42b0-9abf-71541c1c2fe3',
    login: 'john_smith',
    password: 'john123',
    version: 1,
    createdAt: 1732558400000,
    updatedAt: 1732558400000,
  },
];

export const artists: Artist[] = [
  {
    id: 'a4c7a80f-dd89-4c5a-a57c-629ae78735a3',
    name: 'The Weeknd',
    grammy: true,
  },
  {
    id: '030f678a-16e9-4ce1-be37-70d655e28119',
    name: 'Ammy Winehouse',
    grammy: true,
  },
  {
    id: '7910f743-a22b-4245-9df6-956d7f22c606',
    name: 'Adele',
    grammy: true,
  },
];
export const albums: Album[] = [
  // The Weeknd
  {
    id: '6f1bbf41-4339-4da7-9ecc-8b6caf77c001',
    name: 'After Hours',
    year: 2020,
    artistId: 'a4c7a80f-dd89-4c5a-a57c-629ae78735a3',
  },
  {
    id: '0a573895-f1f7-4d3a-be13-1fea3c0a6002',
    name: 'Starboy',
    year: 2016,
    artistId: 'a4c7a80f-dd89-4c5a-a57c-629ae78735a3',
  },

  // Amy Winehouse
  {
    id: 'c20a1f7e-d9d7-49de-8ea6-02b4d2c7c003',
    name: 'Back to Black',
    year: 2006,
    artistId: '030f678a-16e9-4ce1-be37-70d655e28119',
  },
  {
    id: 'd9ceebac-02cf-4d7f-aac8-10c3fca56004',
    name: 'Frank',
    year: 2003,
    artistId: '030f678a-16e9-4ce1-be37-70d655e28119',
  },

  // Adele
  {
    id: '5c969a80-2487-4eb2-9bce-050b93a1e005',
    name: '21',
    year: 2011,
    artistId: '7910f743-a22b-4245-9df6-956d7f22c606',
  },
  {
    id: '9b3c7871-84bb-4702-bf79-927bbc526006',
    name: '30',
    year: 2021,
    artistId: '7910f743-a22b-4245-9df6-956d7f22c606',
  },
];

