import { IsString, IsNumber, IsOptional, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsString()
  @IsOptional()
  image?: string;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  price?: number;

  @IsString()
  @IsOptional()
  image?: string;
}
