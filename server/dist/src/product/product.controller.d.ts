import { ProductService } from './product.service';
import { Product } from '@prisma/client';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    addProduct(dto: Product, code: number, price: number): Promise<{
        id: string;
        name: string;
        code: number;
        price: number;
        image: string;
        unitId: string;
        categoryId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllProducts(): Promise<{
        id: string;
        name: string;
        code: number;
        price: number;
        image: string;
        unitId: string;
        categoryId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getSingleProduct(id: string): Promise<{
        id: string;
        name: string;
        code: number;
        price: number;
        image: string;
        unitId: string;
        categoryId: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
    editProduct(dto: Product, id: string): Promise<{
        id: string;
        name: string;
        code: number;
        price: number;
        image: string;
        unitId: string;
        categoryId: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
    deleteProduct(id: string): Promise<{
        id: string;
        name: string;
        code: number;
        price: number;
        image: string;
        unitId: string;
        categoryId: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
}
