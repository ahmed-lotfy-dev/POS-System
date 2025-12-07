import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectAws } from 'aws-sdk-v3-nest';
import { S3Client } from '@aws-sdk/client-s3';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Role } from '../generated/prisma/client';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @InjectAws(S3Client) private readonly s3: S3Client;
  @Post('')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@UploadedFile() image: Express.Multer.File) {
    return this.uploadService.uploadImage(this.s3, image);
  }

  @Delete('')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  deleteImage(@Body() dto: { image: string }) {
    return this.uploadService.deleteImage(this.s3, dto);
  }
}
