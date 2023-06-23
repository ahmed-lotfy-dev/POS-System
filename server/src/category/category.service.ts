import { Body, Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async addCategory(@Body() dto: { name: string }) {
    const newCategory = await this.prisma.category.create({
      data: { name: dto.name },
    });

    console.log(dto.name);
    return newCategory;
  }

  async getCategories() {
    const categories = await this.prisma.category.findMany();

    console.log(categories);
    return categories;
  }

  async getSingleCategory(@Param('id', ParseIntPipe) id: number) {
    const singleCategory = await this.prisma.category.findFirst({
      where: { id },
    });
    if (!singleCategory) return { msg: 'category not found' };

    return singleCategory;
  }

  async editCategory(
    @Body() dto: { name: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(id);
    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: { name: dto.name },
    });

    if (!updatedCategory) return { msg: 'category not found' };
    console.log(id);

    return updatedCategory;
  }

  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    const deletedCategory = await this.prisma.category.delete({
      where: { id },
    });

    if (!deletedCategory) return { msg: 'category not found' };
    console.log(id);

    return deletedCategory;
  }
}
