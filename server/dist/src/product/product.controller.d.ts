import { ProductService } from './product.service';
import { Product } from '@prisma/client';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    addProduct(dto: Product, code: number, price: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string;
        code: number;
        price: number;
        unitId: string | null;
        categoryId: string | null;
    }>;
    getAllProducts(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string;
        code: number;
        price: number;
        unitId: string | null;
        categoryId: string | null;
    }[]>;
    getSingleProduct(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string;
        code: number;
        price: number;
        unitId: string | null;
        categoryId: string | null;
    } | {
        msg: string;
    }>;
    editProduct(dto: Product, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string;
        code: number;
        price: number;
        unitId: string | null;
        categoryId: string | null;
    } | {
        msg: string;
    }>;
    deleteProduct(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string;
        code: number;
        price: number;
        unitId: string | null;
        categoryId: string | null;
    } | {
        msg: string;
    }>;
}
