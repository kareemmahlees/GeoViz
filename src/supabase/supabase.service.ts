import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'src/types/supabase';

@Injectable()
export class SupabaseService extends SupabaseClient<Database> {
    constructor(private readonly configService: ConfigService) {
        super(
            configService.get<string>('SUPABASE_URL'),
            configService.get<string>('SUPABASE_KEY'),
        );
    }
}
