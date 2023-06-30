import { CategoryService } from './category.service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    addCategory(dto: {
        name: string;
    }): Promise<import("@nestjs/common").ConflictException | import("@prisma/client").Category>;
    getAllCategories(): Promise<import("@prisma/client").Category[]>;
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
