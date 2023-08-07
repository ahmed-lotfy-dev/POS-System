import { ProductService } from './product.service';
import { Product } from '@prisma/client';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    addProduct(dto: Product, code: number, price: number, categoryId: number, unitId: number): Promise<{
        id: number;
        name: string;
        code: number;
        price: number;
        image: string;
        unitId: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllProducts(): Promise<{
        id: number;
        name: string;
        code: number;
        price: number;
        image: string;
        unitId: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getSingleProduct(id: number): Promise<{
        id: number;
        name: string;
        code: number;
        price: number;
        image: string;
        unitId: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
    editProduct(dto: Product, id: number): Promise<{
        id: number;
        name: string;
        code: number;
        price: number;
        image: string;
        unitId: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
    deleteProduct(id: number): Promise<{
        id: number;
        name: string;
        code: number;
        price: number;
        image: string;
        unitId: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    } | {
        msg: string;
    }>;
}
