import { Injectable, NotFoundException } from '@nestjs/common';
import { Pagination } from 'src/pagination/interfaces/pagination.interface';
import { Movie } from './entities/movie.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DirectorService } from 'src/director/director.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    private directorService: DirectorService,
  ) { }

  async find(
    options: {
      filter?: Partial<Pick<Movie, '_id'>>;
      pagination?: Pagination;
    } | null = null,
  ) {
    const filter = {
      ...(options?.filter?._id ? { _id: options?.filter?._id } : {}),
    };

    const page = options?.pagination?.number || 0;
    const limit = options?.pagination?.length || 10;
    const offset = (page - 1) * limit;

    return this.movieModel.find(filter, {}, { skip: offset, limit }).exec();
  }

  async findOne(options: Partial<Pick<Movie, '_id'>>) {
    const filter = {
      ...(options?._id ? { _id: options?._id } : {}),
    };

    return this.movieModel.findOne(filter).exec();
  }

  async save(payload: Omit<Movie, '_id' | 'director'>) {
    if (payload.directorId) {
      await this.checkDirector(payload.directorId);
    }

    const createdModel = new this.movieModel(payload);
    return createdModel.save();
  }

  async update(id: string, payload: Partial<Movie>) {
    const movie = await this.findOne({ _id: id });

    if (!movie) {
      throw new NotFoundException(
        'there is no valid movie matches with given information',
      );
    }

    if (payload.directorId) {
      await this.checkDirector(payload.directorId);
    }

    return this.movieModel.updateOne({ _id: id }, payload);
  }

  async deleteOne(options: Partial<Pick<Movie, '_id'>>) {
    const filter = {
      ...(options?._id ? { _id: options?._id } : {}),
    };

    return this.movieModel.deleteOne(filter).exec();
  }

  async checkDirector(directorId: string) {
    const director = await this.directorService.findOne({
      _id: directorId,
    });

    if (!director) {
      throw new NotFoundException(
        'there is no valid director matches with given information',
      );
    }
  }
}
