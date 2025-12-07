import { PrismaService } from '../prisma/prisma.service';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    addCategory(dto: {
        name: string;
        image: string;
    }): Promise<unknown>;
    getCategories(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string;
    }[] | {
        msg: string;
    }>;
    getSingleCategory(id: string): Promise<unknown>;
    editCategory(dto: {
        id: string;
        name: string;
        image: string;
    }): Promise<unknown>;
    deleteCategory(id: {
        id: string;
    }): Promise<unknown>;
}
