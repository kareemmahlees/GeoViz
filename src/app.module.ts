import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SupabaseStrategy } from './supabase/supabase.strategy';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from './supabase/supabase.service';
import { ProjectsModule } from './projects/projects.module';

@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
        ProjectsModule,
    ],
    providers: [SupabaseStrategy, SupabaseService],
})
export class AppModule {}
