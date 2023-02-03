import { IsString } from 'class-validator';

export class RefreshTokenDTO {
    @IsString()
    access_token: string;

    @IsString()
    refresh_token: string;
}
