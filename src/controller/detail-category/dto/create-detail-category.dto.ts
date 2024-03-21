import { IsNotEmpty } from 'class-validator';

export class CreateDetailCategoryDto {
  @IsNotEmpty()
  id_category: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  thumbnail: string;

  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  specification: Array<string>;
}
