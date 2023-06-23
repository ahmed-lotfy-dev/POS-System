import { ProductService } from './unit.service';
interface IUnit {
    name: string;
}
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    addCategory(dto: IUnit): Promise<import("@prisma/client").Unit>;
    getAllCategories(): any;
    getSingleProduct(id: number): Promise<import("@prisma/client").Unit | {
        msg: string;
    }>;
    editProduct(dto: IUnit, id: number): Promise<import("@prisma/client").Unit | {
        msg: string;
    }>;
    deleteProduct(id: number): any;
}
export {};
