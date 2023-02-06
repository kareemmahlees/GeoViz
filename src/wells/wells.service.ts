import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { UpdateWellDto, CreateWellDto } from './dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class WellsService {
    constructor(private readonly supabase: SupabaseService) {}

    async get(wellId: string, userId: string) {
        const { data, error } = await this.supabase
            .from('wells')
            .select('*,logs(created_at,name,id)')
            .eq('id', wellId)
            .eq('user_id', userId)
            .single();

        if (!data) {
            throw new NotFoundException(
                'not found',
                `well with id ${wellId} doesn't exist`,
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

    async create(projectId: string, userId: string, wellData: CreateWellDto) {
        wellData['project_id'] = projectId;
        wellData['user_id'] = userId;
        const { data, error } = await this.supabase
            .from('wells')
            .insert(wellData)
            .select()
            .single();

        if (error != null) {
            if (error.details.includes('Key is not present')) {
                throw new NotFoundException(
                    'not found',
                    `project with id ${projectId} doesn't exist`,
                );
            } else {
                throw new InternalServerErrorException(error.message, {
                    description: error.details,
                });
            }
        }
        if (!data) {
            throw new InternalServerErrorException(
                "couldn't create well",
                'an error occurred while creating the well',
            );
        }
        delete data.user_id;
        return data;
    }

    async update(
        userId: string,
        wellId: string,
        updateWellData: UpdateWellDto,
    ) {
        const { data, error } = await this.supabase
            .from('wells')
            .update(updateWellData)
            .eq('id', wellId)
            .eq('user_id', userId)
            .select()
            .single();

        // this check must go before the error check
        // because the error check complains there is no return when
        // the id is wrong
        if (!data) {
            console.log(error.details);

            throw new NotFoundException(
                'not found',
                `well with id ${wellId} doesn't exist`,
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

    async delete(wellId: string, userId: string) {
        const { data: deletedWell, error } = await this.supabase
            .from('wells')
            .delete({ count: 'exact' })
            .eq('id', wellId)
            .eq('user_id', userId)
            .select()
            .single();

        // this check must go before the error check
        // because the error check complains there is no return when
        // the id is wrong
        if (!deletedWell) {
            throw new NotFoundException(
                'not found',
                `well with id ${wellId} doesn't exist`,
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
