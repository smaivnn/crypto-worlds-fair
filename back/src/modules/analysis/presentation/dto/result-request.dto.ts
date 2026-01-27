import { Type } from 'class-transformer';
import {
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

const BirthTimeValues = [
  'ja',
  'chuk',
  'in',
  'myo',
  'jin',
  'sa',
  'o',
  'mi',
  'sin',
  'yu',
  'sul',
  'hae',
] as const;

class ProfileDto {
  @IsString()
  @IsIn(['male', 'female', 'secret'])
  gender!: string;

  @IsString()
  birthDate!: string;

  @IsOptional()
  @IsIn(BirthTimeValues as unknown as string[])
  birthTime?: (typeof BirthTimeValues)[number];

  @IsOptional()
  @IsString()
  birthPlace?: string; // "US"

  // ! 추후 업데이트 필요
  @IsOptional()
  @IsString()
  birthCity?: string; // "New York"
}

export class ResultRequestDto {
  @ValidateNested()
  @Type(() => ProfileDto)
  profile!: ProfileDto;

  @IsObject()
  answers!: Record<string, string>;

  @IsOptional()
  @IsString()
  version?: string; // "v1"

  @IsOptional()
  @IsIn(['en', 'ko'])
  locale?: 'en' | 'ko';
}
