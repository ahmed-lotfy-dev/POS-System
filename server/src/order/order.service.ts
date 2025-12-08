import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order, OrderItem } from '../generated/prisma/client';

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

    // Prepare order items for creation, adding the created order's ID
    const orderItemsToCreate = orderItems.map((item) => ({
      productId: item.productId, // Assuming item.productId is available in the DTO
      quantity: item.quantity,
      price: item.price,
      subtotal: item.subtotal,
      orderId: createdOrder.id,
    }));

    // Create order items
    await this.prisma.orderItem.createMany({
      data: orderItemsToCreate,
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

  async getSingleOrder(id: string) {
    const singleOrder = await this.prisma.order.findFirst({
      where: {
        OR: [
          { id: id }, // Search by UUID id
          { orderNumber: id }, // Search by orderNumber
        ],
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });
    if (!singleOrder) {
      return { msg: 'order not found' };
    }
    return singleOrder;
  }

  async editOrder(dto: Order, id: string) {
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
      if (!updatedOrder) return { msg: 'Order not found' };

      return updatedOrder;
    } catch (error) {
      throw error; // Rethrow the error to handle it globally or log it
    }
  }

  async deleteOrder(id: string) {
    try {
      const order = await this.prisma.order.findFirst({
        where: { orderNumber: id },
      });
      if (!order) return { msg: 'Order Not Exist' };

      // Delete the order
      await this.prisma.order.delete({
        where: { id: order.id }, // Use the found order's actual ID for deletion
      });

      return { msg: 'Order deleted successfully' };
    } catch (error) {
      return { msg: error };
    }
  }
}
