import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { SupabaseGuard } from 'src/supabase/supabase.guard';
import { Request } from 'express';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO, UpdateProjectDTO } from './dto';

@Controller('projects')
@UseGuards(SupabaseGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get('/all')
    async getAllProjects(@Req() req: Request) {
        return await this.projectsService.getAllProjects(req['user']['sub']);
    }

    @Get('/:project_id')
    async getProjectData(
        @Param('project_id', ParseUUIDPipe) projectId: string,
        @Req() request: Request,
    ) {
        return await this.projectsService.getProjectDetails(
            projectId,
            request['user']['sub'],
        );
    }

    @Post()
    async createProject(
        @Body() projectData: CreateProjectDTO,
        @Req() request: Request,
    ) {
        projectData['user_id'] = request['user']['sub'];
        return await this.projectsService.createProject(projectData);
    }

    @Patch(':project_id')
    async updateProject(
        @Param('project_id', ParseUUIDPipe) projectId: string,
        @Body() updateProjectData: UpdateProjectDTO,
        @Req() request: Request,
    ) {
        return await this.projectsService.updateProject(
            projectId,
            request['user']['sub'],
            updateProjectData,
        );
    }

    @Delete(':project_id')
    async deleteProject(
        @Param('project_id', ParseUUIDPipe) projectId: string,
        @Req() request: string,
    ) {
        return await this.projectsService.deleteProject(
            projectId,
            request['user']['sub'],
        );
    }
}
