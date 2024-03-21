import { IsNotEmpty } from 'class-validator';

export class CreateSpecificationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  value: Array<string>;
}
