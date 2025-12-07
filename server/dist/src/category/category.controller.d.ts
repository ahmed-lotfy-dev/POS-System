import { CategoryService } from './category.service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    addCategory(dto: {
        name: string;
        image: string;
    }): Promise<unknown>;
    getAllCategories(): Promise<{
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
