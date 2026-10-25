import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
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
import { Public } from '../auth/decorator/public.decorator';
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

  // Public image streaming: <img> tags carry no JWT, so this route bypasses
  // the global JwtGuard. Content-Type/caching flow from the stored metadata;
  // immutable because keys are content-versioned by their uuid prefix.
  @Public()
  @Get(':key')
  async serveImage(@Param('key') key: string, @Res() res: any) {
    try {
      const out: any = await this.uploadService.getImage(this.s3, key);
      res.setHeader('Content-Type', out.ContentType || 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      out.Body.pipe(res);
    } catch {
      res.status(404).send('Image not found');
    }
  }

  @Delete('')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  deleteImage(@Body() dto: { image: string }) {
    return this.uploadService.deleteImage(this.s3, dto);
  }
}
