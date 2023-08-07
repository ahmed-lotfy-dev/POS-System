import { PrismaService } from 'src/prisma/prisma.service';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    addCategory(dto: {
        name: string;
        image: string;
    }): Promise<any>;
    getCategories(): Promise<{
        id: number;
        name: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }[] | {
        msg: string;
    }>;
    getSingleCategory(id: number): Promise<any>;
    editCategory(dto: {
        name: string;
        image: string;
    }, id: number): Promise<any>;
    deleteCategory(id: number): Promise<any>;
}
