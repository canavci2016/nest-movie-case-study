import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'DirectoryResponseDto' })
export class Director {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  bio: string;
  @ApiProperty()
  _id: string;
}