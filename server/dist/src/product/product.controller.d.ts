import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
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
    add(dto: ProductDto): Promise<{
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
    edit(id: string, dto: ProductDto): Promise<{
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
    delete(id: string): Promise<{
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
