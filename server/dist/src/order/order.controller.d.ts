import { OrderService } from './order.service';
import { Order } from '@prisma/client';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    createOrder(dto: Order): Promise<{
        id: string;
        orderNumber: string;
        userId: string;
        totalAmount: number;
        orderDate: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllProducts(): Promise<{
        id: string;
        orderNumber: string;
        userId: string;
        totalAmount: number;
        orderDate: Date;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getSingleProduct(id: string): Promise<{
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