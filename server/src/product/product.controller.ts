import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('add')
  addProduct(
    @Body() dto: Product,
    @Body('code', ParseIntPipe) code: number,
    @Body('price', ParseIntPipe) price: number,
  ) {
    return this.productService.addProduct(dto, code, price);
  }

  @Get('getAll')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('get/:id')
  getSingleProduct(@Param('id') id: string) {
    return this.productService.getSingleProduct(id);
  }

  @Patch('edit/:id')
  editProduct(@Body() dto: Product, @Param('id') id: string) {
    return this.productService.editProduct(dto, id);
  }

  @Delete('delete/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
