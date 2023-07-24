/// <reference types="multer" />
import { UploadService } from './upload.service';
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    private readonly s3;
    uploadProductImage(image: Express.Multer.File): Promise<{
        image: string;
    }>;
}
