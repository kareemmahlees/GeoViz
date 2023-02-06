// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SupabaseService } from './supabase.service';

@Injectable()
export class SupabaseGuard extends AuthGuard('jwt') {
    constructor(private readonly supabase: SupabaseService) {
        super();
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // passport check
        const parentCanActivate = (await super.canActivate(context)) as boolean;

        // supabase check
        const req = context.switchToHttp().getRequest();
        const token = req.headers['authorization'].split(' ')[1];
        const { error } = await this.supabase.auth.getUser(token);

        return parentCanActivate && !error;
    }
}
