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
  constructor(private prisma: PrismaService) {}

  async addCategory(@Body() dto: { name: string; image: string }) {
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

      return { msg: 'Category Add Succssfully', newCategory };
    } catch (error) {
      return error;
    }
  }

  async getCategories() {
    try {
      const categories = await this.prisma.category.findMany();
      console.log(categories);
      return categories;
    } catch (error) {
      console.log(error);
      return { msg: 'No Categoris' };
    }
  }

  async getSingleCategory(@Param('id') id: string) {
    try {
      const singleCategory = await this.prisma.category.findFirst({
        where: { id },
      });
      if (!singleCategory) return { msg: 'category not found' };
      return singleCategory;
    } catch (error) {
      return error;
    }
  }

  async editCategory(@Body() dto: { id: string; name: string; image: string }) {
    const { id, name, image } = dto;
    try {
      const updatedCategory = await this.prisma.category.update({
        where: { id },
        data: { name, image },
      });
      if (!updatedCategory) return { msg: 'category not found' };
      return updatedCategory;
    } catch (error) {
      return error;
    }
  }

  async deleteCategory(@Param('id') id: { id: string }) {
    console.log(id);
    try {
      const deletedCategory = await this.prisma.category.delete({
        where: { id: id.id },
      });
      if (!deletedCategory) return { msg: 'category not found' };
      console.log(id);

      return deletedCategory;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
