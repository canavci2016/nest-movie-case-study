import {
  IsEnum,
  IsString,
  Length,
  Max,
  Min,
  Matches,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { MovieGenreTypes } from '../models/movie.model';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'UpdateMovieDto' })
export class Update {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 100, { message: 'title must be lower than 100 characters' })
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: "$property must be formatted as yyyy-mm-dd"
  })
  releaseDate: Date;

  @ApiProperty({ enum: MovieGenreTypes })
  @IsOptional()
  @IsEnum(MovieGenreTypes)
  genre: string;

  @ApiProperty()
  @IsOptional()
  @Min(0)
  @Max(5)
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imdbId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  directorId: string;
}
