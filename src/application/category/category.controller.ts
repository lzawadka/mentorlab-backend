import { Controller, Post, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from 'src/application/category/category.service';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesPermissionsGuard } from 'src/shared/guards/roles.guard';

@Controller('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesPermissionsGuard)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'Category successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @Roles(UserRole.ADMIN)
    async createCategory(@Body('name') name: string) {
        return this.categoryService.createCategory(name);
    }

    @Get()
    @ApiOperation({ summary: 'Fetch all categories' })
    @ApiResponse({
        status: 200,
        description: 'List of all categories.'
    })
    @Roles(UserRole.ADMIN)
    async getAllCategories() {
        return this.categoryService.getAllCategories();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Fetch a category by ID' })
    @ApiParam({
        name: 'id',
        type: 'number',
        description: 'ID of the category to fetch',
    })
    @ApiResponse({
        status: 200,
        description: 'Category successfully retrieved.'
    })
    @ApiResponse({ status: 404, description: 'Category not found.' })
    @Roles(UserRole.ADMIN)
    async getCategoryById(@Param('id') id: number) {
        return this.categoryService.getCategoryById(Number(id));
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category by ID' })
    @ApiParam({
        name: 'id',
        type: 'number',
        description: 'ID of the category to delete',
    })
    @ApiResponse({ status: 200, description: 'Category successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Category not found.' })
    @Roles(UserRole.ADMIN)
    async deleteCategory(@Param('id') id: number) {
        return this.categoryService.deleteCategory(id);
    }
}
