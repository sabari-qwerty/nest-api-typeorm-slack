import { CreateDataDto } from './create.data.dto';
import { PartialType } from '@nestjs/mapped-types';

export class updateDataDto extends PartialType(CreateDataDto) {}
