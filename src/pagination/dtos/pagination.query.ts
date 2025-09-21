import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from '../interfaces/pagination.interface';

export class PaginationQuery {
  @ApiProperty({
    type: 'object',
    properties: {
      number: {
        type: 'number',
        example: 1,
      },
      length: {
        type: 'number',
        example: 20,
      },
    },
  })
  pagination: Pagination;
}
