import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
  Matches,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { MovieGenreTypes } from '../models/movie.model';

export class Update {
  @IsOptional()
  @IsString()
  @Length(0, 100, { message: 'title must be lower than 100 characters' })
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: "$property must be formatted as yyyy-mm-dd"
  })
  releaseDate: Date;

  @IsOptional()
  @IsEnum(MovieGenreTypes)
  genre: string;

  @IsOptional()
  @Min(0)
  @Max(5)
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  imdbId: string;

  @IsOptional()
  @IsString()
  directorId: string;
}
