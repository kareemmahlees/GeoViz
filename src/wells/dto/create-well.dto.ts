import { IsString } from 'class-validator';

export class CreateWellDto {
    @IsString()
    name: string;

    @IsString()
    x_location: string;

    @IsString()
    y_location: string;

    @IsString()
    kb: string;

    @IsString()
    td: string;

    @IsString()
    trajectory: string;
}
