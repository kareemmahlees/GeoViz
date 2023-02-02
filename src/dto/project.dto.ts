import { IsOptional, IsString } from 'class-validator';

export class CreateProjectDTO {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    location: string;
}

export class UpdateProjectDTO {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    location: string;
}
