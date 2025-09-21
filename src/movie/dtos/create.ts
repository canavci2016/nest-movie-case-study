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
import { ApiProperty, ApiSchema } from '@nestjs/swagger';


@ApiSchema({ name: 'CreateMovieDto' })
export class Create {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(0, 100, { message: 'title must be lower than 100 characters' })
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: "$property must be formatted as yyyy-mm-dd"
  })
  releaseDate: Date;

  @ApiProperty({ enum: MovieGenreTypes })
  @IsEnum(MovieGenreTypes)
  genre: string;

  @ApiProperty()
  @Min(0)
  @Max(5)
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imdbId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  directorId: string;
}
