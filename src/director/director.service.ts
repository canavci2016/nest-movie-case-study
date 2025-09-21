import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Director } from './models/director.model';
import { Model } from 'mongoose';
import { Pagination } from 'src/pagination/interfaces/pagination.interface';

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel(Director.name) private movieModel: Model<Director>,
  ) {}

  async find(
    options: {
      filter?: Partial<Pick<Director, '_id'>>;
      pagination?: Pagination;
    } | null = null,
  ) {
    const filter = {
      ...(options?.filter?._id ? { _id: options?.filter?._id } : {}),
    };

    return this.movieModel.find(filter).exec();
  }

  async save(payload: Omit<Director, '_id'>) {
    const createdModel = new this.movieModel(payload);
    return createdModel.save();
  }

  async deleteOne(options: Partial<Pick<Director, '_id'>>) {
    const filter = {
      ...(options?._id ? { _id: options?._id } : {}),
    };

    return this.movieModel.deleteOne(filter).exec();
  }
}
