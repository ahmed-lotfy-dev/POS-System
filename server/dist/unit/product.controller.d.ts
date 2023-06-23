import { ProductService } from './unit.service';
import { Product } from '@prisma/client';
export interface IProduct {
    name: string;
    code: number;
    category: string;
    image: string;
    price: number;
    unit: string;
}
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    addCategory(dto: IProduct): Promise<Product>;
    getAllCategories(): Promise<Product[]>;
    getSingleProduct(id: number): Promise<Product | {
        msg: string;
    }>;
    editProduct(dto: IProduct, id: number): Promise<Product | {
        msg: string;
    }>;
    deleteProduct(id: number): Promise<Product | {
        msg: string;
    }>;
}
