import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseStrategy } from 'src/supabase/supabase.strategy';
import { SupabaseService } from 'src/supabase/supabase.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    controllers: [AuthController],
    providers: [AuthService, SupabaseStrategy, SupabaseService, MulterModule],
    exports: [SupabaseStrategy],
})
export class AuthModule {}
