import { CategoryService } from './category.service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    addCategory(dto: {
        name: string;
        image: string;
    }): Promise<any>;
    getAllCategories(): Promise<{
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
