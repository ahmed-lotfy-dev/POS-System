import { PrismaService } from 'src/prisma/prisma.service';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    addCategory(dto: {
        name: string;
        image: string;
    }): Promise<any>;
    getCategories(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string;
    }[] | {
        msg: string;
    }>;
    getSingleCategory(id: string): Promise<any>;
    editCategory(dto: {
        id: string;
        name: string;
        image: string;
    }): Promise<any>;
    deleteCategory(id: {
        id: string;
    }): Promise<any>;
}
