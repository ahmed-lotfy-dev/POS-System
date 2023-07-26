import {
  Body,
  ConflictException,
  Injectable,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  async addCategory(@Body() dto: { name: string, image: string }) {
    try {
      console.log(dto);

      const existed = await this.prisma.category.findFirst({
        where: { name: dto.name },
      });
      console.log(existed);
      if (existed) {
        throw new ConflictException('Category already exist');
      }

      const newCategory = await this.prisma.category.create({
        data: { name: dto.name, image: dto.image },
      });
      console.log(newCategory);

      return { msg: "Category Add Succssfully", newCategory }
    } catch (error) {
      return error
    }
  }

  async getCategories() {
    try {
      const categories = await this.prisma.category.findMany();
      console.log(categories);
      return categories
    } catch (error) {
      console.log(error);
      return { msg: "No Categoris" }
    }
  }

  async getSingleCategory(@Param('id', ParseIntPipe) id: number) {
    try {
      const singleCategory = await this.prisma.category.findFirst({
        where: { id },
      });
      if (!singleCategory) return { msg: 'category not found' };
      return singleCategory;
    } catch (error) {
      return error
    }
  }

  async editCategory(
    @Body() dto: { name: string, image: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      console.log(id);
      const updatedCategory = await this.prisma.category.update({
        where: { id },
        data: { name: dto.name, image: dto.image },
      });
      if (!updatedCategory) return { msg: 'category not found' };
      console.log(id);
      return updatedCategory;
    } catch (error) {
      return error
    }
  }

  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedCategory = await this.prisma.category.delete({
        where: { id },
      });
      if (!deletedCategory) return { msg: 'category not found' };
      console.log(id);

      return deletedCategory;
    } catch (error) {
      return error
    }
  }
}
