import { PartialType } from '@nestjs/mapped-types';
import { CreateShepherdDto } from './create-shepherd.dto';

export class UpdateShepherdBySelfDto extends PartialType(CreateShepherdDto) {}
