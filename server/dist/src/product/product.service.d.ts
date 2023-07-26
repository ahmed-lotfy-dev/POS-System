import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    addProduct(dto: Product, code: number, price: number, categoryId: number, unitId: number): Promise<Product>;
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
