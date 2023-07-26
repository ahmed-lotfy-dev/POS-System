import { ProductService } from './product.service';
import { Product } from '@prisma/client';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    addProduct(dto: Product, code: number, price: number): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    getSingleProduct(id: number): Promise<Product | {
        msg: string;
    }>;
    editProduct(dto: Product, id: number): Promise<Product | {
        msg: string;
    }>;
    deleteProduct(id: number): Promise<Product | {
        msg: string;
    }>;
}
