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
import { OrderService } from './order.service';

import { Order, OrderItem } from '../generated/prisma/client';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Public } from '../auth/decorator/public.decorator';
import { Role } from '../generated/prisma/client';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('add')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.CASHIER)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order successfully created.' })
  createOrder(@Body() dto: { orderData: Order; orderItems: OrderItem[] }) {
    return this.orderService.createOrder(dto);
  }

  @Public()
  @Get('getAll')
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Return all orders.' })
  getAllProducts() {
    return this.orderService.getAllOrders();
  }

  @Public()
  @Get('get/:id')
  @ApiOperation({ summary: 'Get a single order by ID' })
  @ApiResponse({ status: 200, description: 'Return the order.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  getSingleProduct(@Param('id') id: string) {
    return this.orderService.getSingleOrder(id);
  }

  @Patch('edit/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Edit an order' })
  @ApiResponse({ status: 200, description: 'Order successfully updated.' })
  editOrder(@Body() dto: Order, @Param('id') id: string) {
    return this.orderService.editOrder(dto, id);
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 200, description: 'Order successfully deleted.' })
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}
