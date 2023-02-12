import {
    Injectable,
    // OnApplicationBootstrap,
    OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'types/supabase';

@Injectable()
export class SupabaseService
    extends SupabaseClient<Database>
    implements OnModuleInit
{
    constructor(private readonly configService: ConfigService) {
        super(
            configService.get<string>('SUPABASE_URL'),
            configService.get<string>('SUPABASE_KEY'),
            {
                auth: {
                    autoRefreshToken: true,
                    detectSessionInUrl: false,
                },
            },
        );
    }

    async onModuleInit() {
        if (process.env.NODE_ENV === 'development') {
            console.log(true);

            const { error: err1 } = await this.storage.createBucket('avatars', {
                public: false,
            });
            if (err1 != null) {
                console.log(err1);
            }
            const { error: err2 } = await this.storage.createBucket(
                'attachments',
                { public: false },
            );
            if (err2 != null) {
                console.log(err2);
            }
        }
    }
}
