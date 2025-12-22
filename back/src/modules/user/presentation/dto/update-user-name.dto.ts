import { IsString, MinLength } from 'class-validator';

export class UpdateUserNameDto {
  @IsString()
  @MinLength(2)
  name: string;
}
