import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectAws } from 'aws-sdk-v3-nest';
import { S3Client } from '@aws-sdk/client-s3';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @InjectAws(S3Client) private readonly s3: S3Client;
  @Post('product')
  @UseInterceptors(FileInterceptor('image'))
  uploadProductImage(@UploadedFile() image: Express.Multer.File) {
    return this.uploadService.uploadProductImage(this.s3, image);
  }
}
