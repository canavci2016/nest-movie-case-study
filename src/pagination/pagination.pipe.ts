import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { Pagination } from './interfaces/pagination.interface';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(pagination: Pagination, metadata: ArgumentMetadata) {
    return {
      number: pagination?.number || 1,
      length: pagination?.length || 10,
    };
  }
}
