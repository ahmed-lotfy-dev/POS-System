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
        createdAt: Date;
        updatedAt: Date;
        orderNumber: string;
        userId: string;
        totalAmount: number;
        orderDate: Date;
    }>;
    getAllProducts(): Promise<({
        orderItems: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            orderId: string;
            productId: string;
            quantity: number;
            subtotal: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: string;
        userId: string;
        totalAmount: number;
        orderDate: Date;
    })[]>;
    getSingleProduct(id: string): Promise<({
        orderItems: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            orderId: string;
            productId: string;
            quantity: number;
            subtotal: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: string;
        userId: string;
        totalAmount: number;
        orderDate: Date;
    }) | {
        msg: string;
    }>;
    editOrder(dto: Order, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: string;
        userId: string;
        totalAmount: number;
        orderDate: Date;
    } | {
        msg: string;
    }>;
    deleteOrder(id: string): Promise<{
        msg: any;
    }>;
}
