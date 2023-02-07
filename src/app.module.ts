import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SupabaseStrategy } from './supabase/supabase.strategy';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from './supabase/supabase.service';
import { ProjectsModule } from './projects/projects.module';
import { WellsModule } from './wells/wells.module';
import { SupabaseModule } from './supabase/supabase.module';
import { LogsModule } from './log/logs.module';

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
        }),
        ProjectsModule,
        WellsModule,
        SupabaseModule,
        LogsModule,
    ],
    providers: [SupabaseStrategy, SupabaseService],
})
export class AppModule {}
