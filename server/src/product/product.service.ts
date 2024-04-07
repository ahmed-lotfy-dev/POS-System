import { Body, Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async addProduct(@Body() dto: Product, code: number, price: number) {
    const newProduct = await this.prisma.product.create({
      data: { ...dto, code, price },
    });
    console.log(dto);
    return newProduct;
  }

  async getAllProducts() {
    const products = await this.prisma.product.findMany();

    console.log(products);
    return products;
  }

  async getSingleProduct(@Param('id') id: string) {
    const singleProduct = await this.prisma.product.findFirst({
      where: { id },
    });
    console.log(singleProduct);
    if (!singleProduct) return { msg: 'product not found' };
    return singleProduct;
  }

  async editProduct(@Body() dto: Product, @Param('id') id: string) {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id }, // Specify the id in the where clause
        data: {
          // Exclude 'id' from the data object
          name: dto.name,
          code: dto.code,
          price: dto.price,
          image: dto.image,
          categoryId: dto.categoryId,
          unitId: dto.unitId,
        },
      });
      console.log({ updatedProduct });
      if (!updatedProduct) return { msg: 'Product not found' };

      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to handle it globally or log it
    }
  }

  async deleteProduct(@Param('id') id: string) {
    const deletedProduct = await this.prisma.product.delete({
      where: { id },
    });

    if (!deletedProduct) return { msg: 'product not found' };

    return deletedProduct;
  }
}
