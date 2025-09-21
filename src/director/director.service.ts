import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Director } from './entities/director.entity';
import { Model } from 'mongoose';
import { Pagination } from 'src/pagination/interfaces/pagination.interface';

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel(Director.name) private directorModel: Model<Director>,
  ) { }

  async find(
    options: {
      filter?: Partial<Pick<Director, '_id'>>;
      pagination?: Pagination;
    } | null = null,
  ) {
    const filter = {
      ...(options?.filter?._id ? { _id: options?.filter?._id } : {}),
    };

    return this.directorModel.find(filter).exec();
  }

  async save(payload: Omit<Director, '_id'>) {
    const createdModel = new this.directorModel(payload);
    return createdModel.save();
  }

  async deleteOne(options: Partial<Pick<Director, '_id'>>) {
    const filter = {
      ...(options?._id ? { _id: options?._id } : {}),
    };

    return this.directorModel.deleteOne(filter).exec();
  }

  async findOne(options: Partial<Pick<Director, '_id'>>) {
    const filter = {
      ...(options?._id ? { _id: options?._id } : {}),
    };

    return this.directorModel.findOne(filter).exec();
  }
}
