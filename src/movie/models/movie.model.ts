import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MovieGenreTypes } from '../entities/movie.entity';

@ApiSchema({ name: 'MovieResponseDto' })
export class Movie {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: Date })
  releaseDate: Date;

  @ApiProperty({ required: true, enum: MovieGenreTypes })
  genre: string;

  @ApiProperty()
  rating: string;

  @ApiProperty()
  imdbId: string;

  @ApiProperty()
  directorId: string;

  @ApiProperty()
  _id: string;
}
