import { PrismaService } from 'src/prisma/prisma.service';
import { Order, OrderItem } from '@prisma/client';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrder(orderData: Order, orderItems: OrderItem[]): Promise<Order>;
    getAllOrders(): Promise<{
        id: string;
        orderNumber: string;
        userId: string;
        totalAmount: number;
        orderDate: Date;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getSingleOrder(id: string): Promise<{
        id: string;
        orderNumber: string;
        userId: string;
        totalAmount: number;
        orderDate: Date;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
    editOrder(dto: Order, id: string): Promise<{
        id: string;
        orderNumber: string;
        userId: string;
        totalAmount: number;
        orderDate: Date;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
    deleteOrder(id: string): Promise<{
        id: string;
        orderNumber: string;
        userId: string;
        totalAmount: number;
        orderDate: Date;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
}
