import { IsNumberString, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsPositive()
  @IsOptional()
  offset: number;

  @IsPositive()
  @IsOptional()
  limit: number;
}
