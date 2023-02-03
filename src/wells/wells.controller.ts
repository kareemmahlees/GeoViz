import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    UseGuards,
    Req,
    Get,
} from '@nestjs/common';
import { WellsService } from './wells.service';
import { CreateWellDto, UpdateWellDto } from './dto';
import { SupabaseGuard } from 'src/supabase/supabase.guard';
import { Request } from 'express';

@UseGuards(SupabaseGuard)
@Controller('wells')
export class WellsController {
    constructor(private readonly wellsService: WellsService) {}

    @Post(':project_id')
    create(
        @Param('project_id', ParseUUIDPipe) projectId: string,
        @Body() wellData: CreateWellDto,
        @Req() request: Request,
    ) {
        return this.wellsService.create(
            projectId,
            request['user']['sub'],
            wellData,
        );
    }

    @Patch(':well_id')
    update(
        @Param('well_id', ParseUUIDPipe) wellId: string,
        @Body() updateWellData: UpdateWellDto,
        @Req() request: Request,
    ) {
        return this.wellsService.update(
            request['user']['sub'],
            wellId,
            updateWellData,
        );
    }

    @Delete(':well_id')
    remove(
        @Param('well_id', ParseUUIDPipe) wellId: string,
        @Req() request: Request,
    ) {
        return this.wellsService.delete(wellId, request['user']['sub']);
    }
}
