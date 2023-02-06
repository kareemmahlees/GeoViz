import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    StreamableFile,
} from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Express } from 'express';

@Injectable()
export class LogsService {
    constructor(private readonly supabase: SupabaseService) {}

    async get(logId: string) {
        const { data, error } = await this.supabase.storage
            .from('attachments')
            .download(`logs/${logId}.csv`);
        if (!data) {
            throw new NotFoundException(
                'not found',
                `log with id ${logId} doesn't exist`,
            );
        }

        if (error != null) {
            throw new InternalServerErrorException(error.name, {
                description: error.message,
            });
        }

        return new StreamableFile(new Uint8Array(await data.arrayBuffer()));
    }

    async upload(wellId: string, file: Express.Multer.File) {
        const { data: insertedLog, error: err1 } = await this.supabase
            .from('logs')
            .insert({ name: file.originalname.split('.')[0], well_id: wellId })
            .select()
            .single();

        if (!insertedLog) {
            throw new NotFoundException(
                'not found',
                `well with id ${wellId} doesn't exist`,
            );
        }

        if (err1 != null) {
            throw new InternalServerErrorException(err1.message, {
                description: err1.details,
            });
        }
        const { error: err2 } = await this.supabase.storage
            .from('attachments')
            .upload(`logs/${insertedLog.id}.csv`, file.buffer);
        if (err2 != null) {
            throw new InternalServerErrorException(err2.name, {
                description: err2.message,
            });
        }
        return insertedLog;
    }

    async update(logId: string, file: Express.Multer.File) {
        const { data, error: err1 } = await this.supabase
            .from('logs')
            .update({ name: file.originalname.split('.')[0] })
            .eq('id', logId)
            .select()
            .single();

        if (!data) {
            throw new NotFoundException(
                'not found',
                `log with id ${logId} doesn't exist`,
            );
        }

        if (err1 != null) {
            throw new InternalServerErrorException(err1.message, {
                description: err1.details,
            });
        }

        const { error: err2 } = await this.supabase.storage
            .from('attachments')
            .update(`logs/${logId}.csv`, file.buffer);

        if (err2 != null) {
            throw new InternalServerErrorException(err2.name, {
                description: err2.message,
            });
        }
        return data;
    }

    async delete(logId: string) {
        const { data, error: err1 } = await this.supabase
            .from('logs')
            .delete({ count: 'exact' })
            .eq('id', logId)
            .select()
            .single();

        if (!data) {
            throw new NotFoundException(
                'not found',
                `log with id ${logId} was not found`,
            );
        }

        if (err1 != null) {
            throw new InternalServerErrorException(err1.message, {
                description: err1.details,
            });
        }

        const { error: err2 } = await this.supabase.storage
            .from('attachments')
            .remove([`logs/${logId}.csv`]);

        if (err2 != null) {
            throw new InternalServerErrorException(err2.name, {
                description: err2.message,
            });
        }
        return '';
    }
}
