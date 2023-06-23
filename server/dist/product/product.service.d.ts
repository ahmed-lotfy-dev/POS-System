import { PrismaService } from 'src/prisma/prisma.service';
import { IProduct } from './product.controller';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    addProduct(dto: IProduct): Promise<import("@prisma/client").Product>;
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
