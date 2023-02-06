import {
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseGuard } from 'src/supabase/supabase.guard';
import { LogsService } from './logs.service';

@Controller('logs')
@UseGuards(SupabaseGuard)
export class LogsController {
    constructor(private readonly logsService: LogsService) {}
    @Get(':log_id')
    get(@Param('log_id', ParseUUIDPipe) logId: string) {
        return this.logsService.get(logId);
    }

    @Post(':well_id')
    @UseInterceptors(FileInterceptor('file'))
    upload(
        @Param('well_id', ParseUUIDPipe) wellId: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.logsService.upload(wellId, file);
    }

    @Patch(':log_id')
    @UseInterceptors(FileInterceptor('file'))
    update(
        @Param('log_id', ParseUUIDPipe) logId: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.logsService.update(logId, file);
    }

    @Delete(':log_id')
    delete(@Param('log_id', ParseUUIDPipe) logId: string) {
        return this.logsService.delete(logId);
    }
}
