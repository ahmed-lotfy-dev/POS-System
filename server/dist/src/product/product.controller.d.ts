import { ProductService } from './product.service';
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
    addProduct(dto: IProduct, code: number, price: number): Promise<import("@prisma/client").Product>;
    getAllProducts(): Promise<import("@prisma/client").Product[]>;
    getSingleProduct(id: number): Promise<import("@prisma/client").Product | {
        msg: string;
    }>;
    editProduct(dto: IProduct, id: number): Promise<import("@prisma/client").Product | {
        msg: string;
    }>;
    deleteProduct(id: number): Promise<import("@prisma/client").Product | {
        msg: string;
    }>;
}
