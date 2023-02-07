import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { UserSignUpDTO, UserSignInDTO, RefreshTokenDTO } from 'src/auth/dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Express } from 'express';

@Injectable()
export class AuthService {
    constructor(private readonly supabase: SupabaseService) {}

    async signUpUser(payload: UserSignUpDTO, file: Express.Multer.File) {
        const { data, error: err1 } = await this.supabase.auth.signUp({
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
        if (err1 != null) {
            if (err1.message === 'User already registered') {
                throw new BadRequestException(err1.message);
            } else {
                throw new InternalServerErrorException(err1.message);
            }
        }
        const { data: uploadedAvatar, error: err2 } =
            await this.supabase.storage
                .from('avatars')
                .upload(`${data.user.id}.png`, file.buffer);

        if (err2 != null) {
            throw new InternalServerErrorException(err2.name, {
                description: err2.message,
            });
        }

        const { data: avatarUrl, error: err3 } = await this.supabase.storage
            .from('avatars')
            .createSignedUrl(uploadedAvatar.path, 3600);

        if (err3 != null) {
            throw new InternalServerErrorException(err3.name, {
                description: err3.message,
            });
        }

        data.user['avatar_url'] = avatarUrl.signedUrl;

        return data.user;
    }

    async signInUser(payload: UserSignInDTO) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: payload.email,
            password: payload.password,
        });

        if (error != null) {
            throw new InternalServerErrorException(error.name, {
                description: error.message,
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
            throw new InternalServerErrorException(error.name, {
                description: error.message,
            });
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
            throw new InternalServerErrorException(error.message, {
                description: error.details,
            });
        }
        const { data: avatar_url } = await this.supabase.storage
            .from('avatars')
            .createSignedUrl(`${user_id}.png`, 3600);
        user_data[0]['avatar_url'] = avatar_url;
        return user_data[0];
    }
}
