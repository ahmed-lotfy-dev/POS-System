import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';

import { Order, OrderItem } from '@prisma/client';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('add')
  createOrder(@Body() dto: Order) {
    return this.orderService.createOrder(dto);
  }

  @Get('getAll')
  getAllProducts() {
    return this.orderService.getAllOrders();
  }

  @Get('get/:id')
  getSingleProduct(@Param('id') id: string) {
    return this.orderService.getSingleOrder(id);
  }

  @Patch('edit/:id')
  editOrder(@Body() dto: Order, @Param('id') id: string) {
    return this.orderService.editOrder(dto, id);
  }

  @Delete('delete/:id')
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}
