import { ApiProperty } from '@nestjs/swagger';

export class PaginationQuery {
  @ApiProperty({ example: 1 })
  number: number;
  @ApiProperty({ example: 10 })
  length: number;
}
