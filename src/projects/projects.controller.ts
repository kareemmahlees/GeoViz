import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { SupabaseGuard } from 'src/supabase/supabase.guard';
import { Request } from 'express';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO, UpdateProjectDTO } from 'src/dto/project.dto';

@Controller('projects')
@UseGuards(SupabaseGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}
    @Get('/all')
    async getAllProjects(@Req() req: Request) {
        return await this.projectsService.getAllProjects(req['user']['sub']);
    }

    @Post('/create')
    async createProject(
        @Body() projectData: CreateProjectDTO,
        @Req() request: Request,
    ) {
        projectData['user_id'] = request['user']['sub'];
        return await this.projectsService.createProject(projectData);
    }

    @Put('/update/:project_id')
    async updateProject(
        @Param('project_id', ParseIntPipe) projectId: number,
        @Body() updateProjectData: UpdateProjectDTO,
        @Req() request: Request,
    ) {
        return await this.projectsService.updateProject(
            projectId,
            request['user']['sub'],
            updateProjectData,
        );
    }

    @Delete('/delete/:project_id')
    async deleteProject(
        @Param('project_id', ParseIntPipe) projectId: number,
        @Req() request: string,
    ) {
        return await this.projectsService.deleteProject(
            projectId,
            request['user']['sub'],
        );
    }
}
