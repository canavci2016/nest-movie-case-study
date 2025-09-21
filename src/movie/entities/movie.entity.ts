import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Director } from 'src/director/entities/director.entity';

export type MovieDocument = HydratedDocument<Movie>;

export enum MovieGenreTypes {
  scary = 'scary',
  action = 'action',
  comedy = 'comedy',
}

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Date })
  releaseDate: Date;

  @Prop({ required: true, enum: MovieGenreTypes })
  genre: string;

  @Prop({ required: true, type: Number })
  rating: number;

  @Prop({ required: true })
  imdbId: string;

  @Prop({ required: true })
  directorId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Director' })
  director: Director;

  _id: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
