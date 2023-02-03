import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { UserSignUpDTO, UserSignInDTO, RefreshTokenDTO } from 'src/auth/dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Express } from 'express';

@Injectable()
export class AuthService {
    constructor(private readonly supabase: SupabaseService) {}

    async signUpUser(payload: UserSignUpDTO, file: Express.Multer.File) {
        const { data, error } = await this.supabase.auth.signUp({
            email: payload.email,
            password: payload.password,
            phone: payload.phone,
            options: {
                data: {
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    gender: payload.gender,
                },
            },
        });
        if (error != null) {
            throw new HttpException('something went wrong', error.status, {
                cause: error,
            });
        }
        if (data.user.identities.length === 0) {
            throw new BadRequestException({ error: 'User already signed in' });
        }
        await this.supabase.storage
            .from('avatars')
            .upload(`${data.user.id}.png`, file.buffer);
        return data.user;
    }

    async signInUser(payload: UserSignInDTO) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: payload.email,
            password: payload.password,
        });

        if (error != null) {
            throw new HttpException(error.message, error.status, {
                cause: error,
            });
        }
        return data.session;
    }

    async refreshToken(payload: RefreshTokenDTO) {
        const { data, error } = await this.supabase.auth.setSession({
            access_token: payload.access_token,
            refresh_token: payload.refresh_token,
        });

        if (error != null) {
            throw new HttpException(error.message, error.status);
        }

        return {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
        };
    }

    async getUserProfile(req: Request) {
        const user_id = req['user']['sub'];
        const { data: user_data, error } = await this.supabase
            .from('profiles')
            .select('*')
            .eq('id', user_id);
        if (error != null) {
            throw new HttpException(error.message, 401);
        }
        const { data: avatar_url } = await this.supabase.storage
            .from('avatars')
            .createSignedUrl(`${user_id}.png`, 3600);
        user_data[0]['avatar_url'] = avatar_url;
        return user_data[0];
    }
}
