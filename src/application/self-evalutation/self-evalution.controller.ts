import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CreateSelfEvaluationDto } from './dto/request/create-self-evalution.dto';
import { SelfEvaluationService } from './self-evaltuation.service';
import { ClientScoped } from 'src/shared/decorators/client-scoped.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesPermissionsGuard } from 'src/shared/guards/roles.guard';
import { UserScoped } from 'src/shared/decorators/user-scoped.decorator';
import { SelfEvaluationUseCase } from './self-evalutaion.user-case';

@Controller('self-evaluation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesPermissionsGuard)
export class SelfEvaluationController {
    constructor(
        private readonly selfEvaluationService: SelfEvaluationService,
        private readonly selfEvaluationUseCase: SelfEvaluationUseCase
    ) {}

    @Post('user/:userId/campaign/:campaignId')
    @ApiOperation({ summary: "Create a self-evaluation", description: "Allows a user to create a self-evaluation for a specific campaign." })
    @ApiResponse({ status: 201, description: "Self-evaluation created successfully." })
    @ApiResponse({ status: 400, description: "Invalid request body." })
    @UserScoped()
    create(
        @Param('userId') userId: number,
        @Param('campaignId') campaignId: number,
        @Body() createSelfEvaluationDto: Array<CreateSelfEvaluationDto>
    ) {
        return this.selfEvaluationUseCase.create(createSelfEvaluationDto, Number(userId), Number(campaignId));
    }

    @Get('user/:userId/campaign/:campaignId')
    @ApiOperation({ summary: "Get all self-evaluations for a user", description: "Fetches all self-evaluations for a specific user and campaign." })
    @ApiResponse({ status: 200, description: "List of self-evaluations." })
    @ApiResponse({ status: 404, description: "User or campaign not found." })
    findAll(
        @Param('userId') userId: number,
        @Param('campaignId') campaignId: number,
    ) {
        return this.selfEvaluationService.getAllByUserAndCampaignId(Number(userId), Number(campaignId));
    }

    @Get(':id')
    @ApiOperation({ summary: "Get a self-evaluation by ID", description: "Fetches a single self-evaluation based on its ID." })
    @ApiResponse({ status: 200, description: "Self-evaluation found." })
    @ApiResponse({ status: 404, description: "Self-evaluation not found." })
    findOne(@Param('id') id: string) {
        return this.selfEvaluationService.getSelfEvaluationById(Number(id));
    }

    @Delete(':id')
    @ApiOperation({ summary: "Delete a self-evaluation", description: "Removes a self-evaluation from the system." })
    @ApiResponse({ status: 200, description: "Self-evaluation deleted successfully." })
    @ApiResponse({ status: 404, description: "Self-evaluation not found." })
    @UserScoped()
    delete(@Param('id') id: string) {
        return this.selfEvaluationService.deleteSelfEvaluation(Number(id));
    }

    @Put(':id')
    @ApiOperation({ summary: "Update a self-evaluation", description: "Updates the details of a self-evaluation." })
    @ApiResponse({ status: 200, description: "Self-evaluation updated successfully." })
    @ApiResponse({ status: 404, description: "Self-evaluation not found." })
    @UserScoped()
    update(@Param('id') id: string, @Body() data: any) {
        return this.selfEvaluationService.updateSelfEvaluation(Number(id), data);
    }
}