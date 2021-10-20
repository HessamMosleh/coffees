import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  offset: number;
}
