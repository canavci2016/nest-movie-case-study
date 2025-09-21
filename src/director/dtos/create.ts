import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class Create {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: '$property must be formatted as yyyy-mm-dd',
  })
  birthDate: Date;

  @IsNotEmpty()
  @IsString()
  bio: string;
}
