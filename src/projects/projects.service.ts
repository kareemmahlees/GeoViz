import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateProjectDTO, UpdateProjectDTO } from 'src/dto/project.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class ProjectsService {
    constructor(private readonly supabase: SupabaseService) {}

    async getAllProjects(userId: string) {
        const { data, error } = await this.supabase
            .from('projects')
            .select('*')
            .eq('user_id', userId);
        if (error != null) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        data.forEach((element) => {
            delete element.user_id;
        });
        return data;
    }

    async createProject(projectData: CreateProjectDTO) {
        const { data, error } = await this.supabase
            .from('projects')
            .insert(projectData)
            .select('*');
        if (error != null) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        data.forEach((element) => {
            delete element.user_id;
        });
        return data;
    }

    async updateProject(
        projectId: number,
        userId: string,
        projectData: UpdateProjectDTO,
    ) {
        const { data, error } = await this.supabase
            .from('projects')
            .update(projectData)
            .eq('user_id', userId)
            .eq('id', projectId)
            .select('*');
        if (error != null) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
        if (data.length === 0) {
            throw new UnauthorizedException(
                'unauthorized',
                'User is not authorized for this action',
            );
        }
        data.forEach((element) => {
            delete element.user_id;
        });
        return data;
    }

    async deleteProject(projectId: number, userId: string) {
        const { data, error } = await this.supabase
            .from('projects')
            .delete({ count: 'exact' })
            .eq('id', projectId)
            .eq('user_id', userId)
            .select('*');

        if (error != null) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
        if (data.length === 0) {
            throw new UnauthorizedException(
                'unauthorized',
                'User is not authorized for this action',
            );
        }
        return '';
    }
}
