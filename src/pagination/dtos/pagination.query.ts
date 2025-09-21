import { ApiProperty } from '@nestjs/swagger';

export class PaginationQuery {
  @ApiProperty()
  number: number;
  @ApiProperty()
  length: number;
}
