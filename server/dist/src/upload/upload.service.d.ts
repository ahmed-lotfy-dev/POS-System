import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    constructor(config: ConfigService);
    uploadImage(s3: S3Client, image: Express.Multer.File): Promise<{
        image: string;
    }>;
    deleteImage(s3: S3Client, dto: {
        image: string;
    }): Promise<{
        msg: string;
    }>;
}
