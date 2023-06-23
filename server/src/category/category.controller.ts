import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';

import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('add')
  addCategory(@Body() dto: { name: string }) {
    return this.categoryService.addCategory(dto);
  }

  @Get('getAll')
  getAllCategories() {
    return this.categoryService.getCategories();
  }

  @Get('get/:id')
  getSingleCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getSingleCategory(id);
  }

  @Patch('edit/:id')
  editCategory(
    @Body() dto: { name: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoryService.editCategory(dto, id);
  }

  @Delete('delete/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
