import { PrismaService } from 'src/prisma/prisma.service';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    addCategory(dto: {
        name: string;
    }): Promise<import("@prisma/client").Category>;
    getCategories(): Promise<import("@prisma/client").Category[]>;
    getSingleCategory(id: number): Promise<import("@prisma/client").Category | {
        msg: string;
    }>;
    editCategory(dto: {
        name: string;
    }, id: number): Promise<import("@prisma/client").Category | {
        msg: string;
    }>;
    deleteCategory(id: number): Promise<import("@prisma/client").Category | {
        msg: string;
    }>;
}
