import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async addCategory(dto: { name: string; image: string }) {
    try {
      const existed = await this.prisma.category.findFirst({
        where: { name: dto.name },
      });
      if (existed) {
        throw new ConflictException('Category already exist');
      }

      const newCategory = await this.prisma.category.create({
        data: { name: dto.name, image: dto.image },
      });

      return { msg: 'Category Add Succssfully', newCategory };
    } catch (error) {
      return error;
    }
  }

  async getCategories() {
    try {
      const categories = await this.prisma.category.findMany();
      return categories;
    } catch (error) {
      return { msg: 'No Categoris' };
    }
  }

  async getSingleCategory(id: string) {
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

  async editCategory(dto: { id: string; name: string; image: string }) {
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

  async deleteCategory(id: { id: string }) {
    try {
      const deletedCategory = await this.prisma.category.delete({
        where: { id: id.id },
      });
      if (!deletedCategory) return { msg: 'category not found' };

      return deletedCategory;
    } catch (error) {
      return error;
    }
  }
}
