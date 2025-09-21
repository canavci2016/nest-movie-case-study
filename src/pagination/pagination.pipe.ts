import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { Pagination } from './interfaces/pagination.interface';

@Injectable()
export class PaginationPipe implements PipeTransform {
  //TODO: this is just a work around very soon. it will be prettified
  transform(pagination: Pagination, metadata: ArgumentMetadata) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const paginationObj: Pagination = this.isJsonString(pagination);
    return {
      number: paginationObj?.number || 1,
      length: paginationObj?.length || 10,
    };
  }

  isJsonString(content: any) {
    try {
      return JSON.parse(content);
    } catch (e) {
      return content;
    }
  }
}
