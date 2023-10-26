import { OrderService } from './order.service';
import { Order, OrderItem } from '@prisma/client';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    createOrder(dto: {
        orderData: Order;
        orderItems: OrderItem[];
    }): Promise<{
        id: string;
        orderNumber: string;
        userId: string;
        totalAmount: number;
        orderDate: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllProducts(): Promise<({
        orderItems: {
            id: string;
            orderId: string;
            productId: string;
            quantity: number;
            price: number;
            subtotal: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        orderNumber: string;
        userId: string;
        totalAmount: number;
        orderDate: Date;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
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
