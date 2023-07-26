import { Body, Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async addProduct(@Body() dto: Product, code: number, price: number, categoryId: number, unitId: number) {
    const newProduct = await this.prisma.product.create({
      data: { ...dto, code, price, categoryId, unitId },
    });
    console.log(dto)
    return newProduct;
  }

  async getAllProducts() {
    const products = await this.prisma.product.findMany();

    console.log(products);
    return products;
  }

  async getSingleProduct(@Param('id', ParseIntPipe) id: number) {
    const singleProduct = await this.prisma.product.findFirst({
      where: { id },
    });
    if (!singleProduct) return { msg: 'product not found' };
    return singleProduct;
  }

  async editProduct(
    @Body() dto: Product,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: { ...dto },
    });

    if (!updatedProduct) return { msg: 'product not found' };
    console.log(id);

    return updatedProduct;
  }

  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const deletedProduct = await this.prisma.product.delete({
      where: { id },
    });

    if (!deletedProduct) return { msg: 'product not found' };

    return deletedProduct;
  }
}
