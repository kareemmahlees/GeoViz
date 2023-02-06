// import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDTO } from './create-project.dto';

export class UpdateProjectDTO extends PartialType(CreateProjectDTO) {}
