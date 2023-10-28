import { Body, Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, OrderItem } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(dto: { orderData: Order; orderItems: OrderItem[] }) {
    const { orderData, orderItems } = dto;
    const createdOrder = await this.prisma.order.create({
      data: {
        orderNumber: orderData.orderNumber,
        userId: orderData.userId,
        totalAmount: orderData.totalAmount,
      },
    });
    const orderItemsList = orderItems.map((item) => ({
      ...item,
      orderId: createdOrder.id,
      productId: item.productId,
    }));

    const createdOrderItems = this.prisma.orderItem.createMany({
      data: orderItemsList,
    });
    return createdOrder;
  }

  async getAllOrders() {
    const orders = await this.prisma.order.findMany({
      include: {
        orderItems: true, // Include the related orderItems
      },
    });
    return orders;
  }

  async getSingleOrder(@Param('id') id: string) {
    const singleOrder = await this.prisma.order.findFirst({
      where: { id },
    });
    if (!singleOrder) return { msg: 'order not found' };
    return singleOrder;
  }

  async editOrder(@Body() dto: Order, @Param('id') id: string) {
    try {
      const updatedOrder = await this.prisma.order.update({
        where: { id }, // Specify the id in the where clause
        data: {},
        // {
        //   // Exclude 'id' from the data object
        //   name: dto.name,
        //   code: dto.code,
        //   price: dto.price,
        //   image: dto.image,
        //   categoryId: dto.categoryId,
        //   unitId: dto.unitId,
        // },
      });
      console.log({ updatedOrder });
      if (!updatedOrder) return { msg: 'Product not found' };

      return updatedOrder;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to handle it globally or log it
    }
  }

  async deleteOrder(@Param('id') id: string) {
    const deletedOrder = await this.prisma.order.delete({
      where: { id },
    });

    if (!deletedOrder) return { msg: 'product not found' };

    return deletedOrder;
  }
}
