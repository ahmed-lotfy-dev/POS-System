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
        // ... other fields for the order
      },
    });

    const orderItemsList = orderItems.map((item) => {
      return {
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
        orderId: createdOrder.id,
      };
    });

    const createdOrderItems = await this.prisma.orderItem.createMany({
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
      where: { orderNumber: id },
      include: { orderItems: true },
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
      if (!updatedOrder) return { msg: 'Order not found' };

      return updatedOrder;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to handle it globally or log it
    }
  }

  async deleteOrder(@Param('id') id: string) {
    try {
      const order = await this.prisma.order.findFirst({
        where: { orderNumber: id },
      });
      if (!order) return { msg: 'Order Not Exist' };

      const deletedOrder = await this.prisma.order.delete({
        where: { orderNumber: id },
      });

      return { msg: 'Order deleted successfully' };
    } catch (error) {
      return { msg: error };
    }
  }
}
