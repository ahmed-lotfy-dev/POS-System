import { CategoryService } from './category.service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    addCategory(dto: {
        name: string;
        image: string;
    }): Promise<any>;
    getAllCategories(): Promise<{
        id: string;
        name: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }[] | {
        msg: string;
    }>;
    getSingleCategory(id: string): Promise<any>;
    editCategory(dto: {
        name: string;
        image: string;
    }, id: string): Promise<any>;
    deleteCategory(id: string): Promise<any>;
}
