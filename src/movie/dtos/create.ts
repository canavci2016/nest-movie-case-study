import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
  Matches,
  IsNumber,
} from 'class-validator';
import { MovieGenreTypes } from '../models/movie.model';

export class Create {
  @IsNotEmpty()
  @IsString()
  @Length(0, 100, { message: 'title must be lower than 100 characters' })
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: "$property must be formatted as yyyy-mm-dd"
  })
  releaseDate: Date;

  @IsEnum(MovieGenreTypes)
  genre: string;

  @Min(0)
  @Max(5)
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  imdbId: string;

  @IsNotEmpty()
  @IsString()
  directorId: string;
}
