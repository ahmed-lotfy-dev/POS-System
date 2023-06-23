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
  addProduct(@Body() dto: IProduct) {
    return this.productService.addProduct(dto);
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
