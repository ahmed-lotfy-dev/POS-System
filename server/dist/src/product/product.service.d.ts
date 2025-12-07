import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    addProduct(dto: ProductDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: number;
        price: number;
        image: string;
        unitId: string | null;
        categoryId: string | null;
    }>;
    getAllProducts(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: number;
        price: number;
        image: string;
        unitId: string | null;
        categoryId: string | null;
    }[]>;
    getSingleProduct(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: number;
        price: number;
        image: string;
        unitId: string | null;
        categoryId: string | null;
    } | {
        msg: string;
    }>;
    editProduct(id: string, dto: ProductDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: number;
        price: number;
        image: string;
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
        code: number;
        price: number;
        image: string;
        unitId: string | null;
        categoryId: string | null;
    } | {
        msg: string;
    }>;
}
