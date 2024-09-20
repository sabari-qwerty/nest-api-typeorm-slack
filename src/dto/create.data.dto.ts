import { IsString } from 'class-validator';

export class CreateDataDto {
  @IsString()
  property: string;
  @IsString()
  url: string;
}

