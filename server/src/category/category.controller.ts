import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';

import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('add')
  addCategory(@Body() dto: { name: string; image: string }) {
    return this.categoryService.addCategory(dto);
  }

  @Get('getAll')
  getAllCategories() {
    return this.categoryService.getCategories();
  }

  @Get('get/:id')
  getSingleCategory(@Body() id: string) {
    return this.categoryService.getSingleCategory(id);
  }

  @Patch('edit/:id')
  editCategory(@Body() dto: { id: string; name: string; image: string }) {
    return this.categoryService.editCategory(dto);
  }

  @Delete('delete/:id')
  deleteCategory(@Param() id: { id: string }) {
    return this.categoryService.deleteCategory(id);
  }
}
