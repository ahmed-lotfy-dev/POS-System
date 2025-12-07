import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { CategoryService } from './category.service';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Role } from '../generated/prisma/client';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('add')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Add a new category' })
  @ApiResponse({ status: 201, description: 'Category successfully created.' })
  addCategory(@Body() dto: { name: string; image: string }) {
    return this.categoryService.addCategory(dto);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Return all categories.' })
  getAllCategories() {
    return this.categoryService.getCategories();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Get a single category by ID' })
  @ApiResponse({ status: 200, description: 'Return the category.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  getSingleCategory(@Body() id: string) {
    return this.categoryService.getSingleCategory(id);
  }

  @Patch('edit/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Edit a category' })
  @ApiResponse({ status: 200, description: 'Category successfully updated.' })
  editCategory(@Body() dto: { id: string; name: string; image: string }) {
    return this.categoryService.editCategory(dto);
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 200, description: 'Category successfully deleted.' })
  deleteCategory(@Param() id: { id: string }) {
    return this.categoryService.deleteCategory(id);
  }
}
