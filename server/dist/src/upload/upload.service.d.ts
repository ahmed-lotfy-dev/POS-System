/// <reference types="multer" />
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    constructor(config: ConfigService);
    uploadProductImage(s3: S3Client, image: Express.Multer.File): Promise<{
        image: string;
    }>;
}
