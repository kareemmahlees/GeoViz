import {
    IsEmail,
    IsIn,
    IsPhoneNumber,
    IsString,
    Length,
} from 'class-validator';

export class UserSignUpDTO {
    @IsEmail()
    email: string;

    @Length(8)
    @IsString()
    password: string;

    @IsPhoneNumber()
    phone: string;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsIn(['male', 'female'])
    gender: string;
}

export class UserSignInDTO {
    @IsEmail()
    email: string;

    @Length(8)
    @IsString()
    password: string;
}

export class RefreshTokenDTO {
    @IsString()
    access_token: string;

    @IsString()
    refresh_token: string;
}
