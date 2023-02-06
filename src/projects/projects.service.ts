import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateProjectDTO, UpdateProjectDTO } from './dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class ProjectsService {
    constructor(private readonly supabase: SupabaseService) {}
    async getProjectDetails(projectId: string, userId: string) {
        const { data, error } = await this.supabase
            .from('projects')
            .select(
                '*,wells(created_at,name,x_location,y_location,kb,td,trajectory,id)',
            )
            .eq('id', projectId)
            .eq('user_id', userId)
            .single();

        if (!data) {
            throw new NotFoundException(
                'not found',
                `project with id ${projectId} doesn't exist`,
            );
        }

        if (error != null) {
            throw new InternalServerErrorException(error.message, {
                description: error.details,
            });
        }

        delete data.user_id;
        return data;
    }

    async getAllProjects(userId: string) {
        const { data, error } = await this.supabase
            .from('projects')
            .select('*')
            .eq('user_id', userId);

        if (error != null) {
            throw new InternalServerErrorException(error.message, {
                description: error.details,
            });
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
            .select()
            .single();

        if (error != null) {
            throw new InternalServerErrorException(error.message, {
                description: error.details,
            });
        }

        if (!data) {
            throw new InternalServerErrorException("couldn't create project", {
                description: 'An error occured while creating project',
            });
        }

        delete data.user_id;

        return data;
    }

    async updateProject(
        projectId: string,
        userId: string,
        projectData: UpdateProjectDTO,
    ) {
        const { data, error } = await this.supabase
            .from('projects')
            .update(projectData)
            .eq('id', projectId)
            .eq('user_id', userId)
            .select()
            .single();

        // this check must go before the error check
        // because the error check complains there is no return when
        // the id is wrong
        if (!data) {
            throw new NotFoundException(
                'not found',
                `project with id ${projectId} doesn't exist`,
            );
        }

        if (error != null) {
            throw new InternalServerErrorException(error.message, {
                description: error.details,
            });
        }

        delete data.user_id;
        return data;
    }

    async deleteProject(projectId: string, userId: string) {
        const { data, error } = await this.supabase
            .from('projects')
            .delete({ count: 'exact' })
            .eq('id', projectId)
            .eq('user_id', userId)
            .select()
            .single();

        // this check must go before the error check
        // because the error check complains there is no return when
        // the id is wrong
        if (!data) {
            throw new NotFoundException(
                'not found',
                `project with id ${projectId} doesn't exist`,
            );
        }
        if (error != null) {
            throw new InternalServerErrorException(error.message, {
                description: error.details,
            });
        }
        return '';
    }
}
