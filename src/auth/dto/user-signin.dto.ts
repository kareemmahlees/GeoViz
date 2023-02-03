import { IsEmail, Length, IsString } from 'class-validator';

export class UserSignInDTO {
    @IsEmail()
    email: string;

    @Length(8)
    @IsString()
    password: string;
}
