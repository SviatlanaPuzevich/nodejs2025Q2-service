import { Artist } from '../artists/artists.dto';
import { Album } from '../albums/albums.dto';
import { Track } from '../tracks/tracks.dto';

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
