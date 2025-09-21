import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/pagination/interfaces/pagination.interface';
import { Movie } from './models/movie.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) { }

  async find(
    options: {
      filter?: Partial<Pick<Movie, '_id'>>;
      pagination?: Pagination;
    } | null = null,
  ) {
    const filter = {
      ...(options?.filter?._id ? { _id: options?.filter?._id } : {}),
    };

    return this.movieModel.find(filter).exec();
  }

  async findOne(options: Partial<Pick<Movie, '_id'>>) {
    const filter = {
      ...(options?._id ? { _id: options?._id } : {}),
    };

    return this.movieModel.findOne(filter).exec();
  }

  async save(payload: Omit<Movie, '_id' | 'director'>) {
    const createdModel = new this.movieModel(payload);
    return createdModel.save();
  }

  async update(id: string, payload: Partial<Movie>) {
    return this.movieModel.updateOne({ _id: id }, payload);
  }

  async deleteOne(options: Partial<Pick<Movie, '_id'>>) {
    const filter = {
      ...(options?._id ? { _id: options?._id } : {}),
    };

    return this.movieModel.deleteOne(filter).exec();
  }
}
