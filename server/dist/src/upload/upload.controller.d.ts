import { UploadService } from './upload.service';
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    private readonly s3;
    uploadImage(image: Express.Multer.File): Promise<{
        image: string;
    }>;
    deleteImage(dto: {
        image: string;
    }): Promise<{
        msg: string;
    }>;
}
