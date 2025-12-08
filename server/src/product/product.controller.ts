import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Public } from '../auth/decorator/public.decorator';
import { Role } from '../generated/prisma/client';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get('getAll')
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Public()
  @Get('get/:id')
  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiResponse({ status: 200, description: 'Return the product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  getSingleProduct(@Param('id') id: string) {
    return this.productService.getSingleProduct(id);
  }

  @Post('add')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Add a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created.' })
  add(@Body() dto: ProductDto) {
    return this.productService.addProduct(dto);
  }

  @Patch('edit/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Edit a product' })
  @ApiResponse({ status: 200, description: 'Product successfully updated.' })
  edit(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.editProduct(id, dto);
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product successfully deleted.' })
  delete(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
