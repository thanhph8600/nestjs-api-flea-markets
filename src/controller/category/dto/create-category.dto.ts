import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  thumbnail: string;
  @IsNotEmpty()
  link: string;
}
