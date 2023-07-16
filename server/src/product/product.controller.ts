import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { Express } from 'express';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';

export interface IProduct {
  name: string;
  code: number;
  category: string;
  image: string;
  price: number;
  unit: string;
}

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('add')
  addProduct(
    @Body() dto: IProduct,
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
  getSingleProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getSingleProduct(id);
  }

  @Patch('edit/:id')
  editProduct(@Body() dto: IProduct, @Param('id', ParseIntPipe) id: number) {
    return this.productService.editProduct(dto, id);
  }

  @Delete('delete/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
