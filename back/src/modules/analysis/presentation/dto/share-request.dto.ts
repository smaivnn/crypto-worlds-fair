import {
  IsArray,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ShareProfileDto {
  @IsString()
  @IsIn(['male', 'female', 'secret'])
  gender!: string;

  @IsString()
  birthDate!: string;

  @IsOptional()
  @IsIn([
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
  ])
  birthTime?: string;

  @IsOptional()
  @IsString()
  birthPlace?: string;
}

class ShareCopySummaryCardDto {
  @IsString()
  mainDesire!: string;

  @IsString()
  subDesire!: string;

  @IsString()
  userQuote!: string;

  @IsString()
  engineLine!: string;

  @IsString()
  styleLine!: string;

  @IsArray()
  @IsString({ each: true })
  tags!: string[];
}

class ShareCopySectionDto {
  @IsArray()
  @IsString({ each: true })
  lines!: string[];
}

class ShareCopyDto {
  @ValidateNested()
  @Type(() => ShareCopySummaryCardDto)
  summaryCard!: ShareCopySummaryCardDto;

  @ValidateNested()
  @Type(() => ShareCopySectionDto)
  structure!: ShareCopySectionDto;

  @ValidateNested()
  @Type(() => ShareCopySectionDto)
  trigger!: ShareCopySectionDto;

  @ValidateNested()
  @Type(() => ShareCopySectionDto)
  illusion!: ShareCopySectionDto;

  @ValidateNested()
  @Type(() => ShareCopySectionDto)
  intimacy!: ShareCopySectionDto;

  @IsString()
  paywallCTA!: string;
}

export class ShareRequestDto {
  @ValidateNested()
  @Type(() => ShareProfileDto)
  profile!: ShareProfileDto;

  @IsObject()
  answers!: Record<string, string>;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsIn(['en', 'ko'])
  locale?: 'en' | 'ko';

  @ValidateNested()
  @Type(() => ShareCopyDto)
  copy!: ShareCopyDto;
}
