import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SupabaseStrategy } from './supabase/supabase.strategy';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from './supabase/supabase.service';

@Module({
    imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true })],
    providers: [SupabaseStrategy, SupabaseService],
})
export class AppModule {}
