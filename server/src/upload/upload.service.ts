import {
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';

@Injectable()
export class UploadService {
  constructor(private config: ConfigService) {}

  async uploadImage(s3: S3Client, image: Express.Multer.File) {
    const id = v4();
    if (!image) throw new Error('No Image Provided');
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: this.config.get('CF_BUCKET_NAME'),
          Key: `${id}-${image.originalname}`,
          Body: image.buffer,
          ContentType: image.mimetype,
          ACL: 'public-read', // Add this line to set the ACL
        }),
      );
      const imageUrl = `${this.config.get('CF_IMAGES_SUBDOMAIN')}/${id}-${image.originalname}`;
      return { image: imageUrl };
    } catch (error) {
      throw new Error('Failed To Upload Image');
    }
  }

  async deleteImage(s3: S3Client, dto: { image: string }) {
    const image = dto.image;
    if (!image) throw new Error('No Image Provided');
    const filePathname = image.split(this.config.get('CF_IMAGES_SUBDOMAIN'))[1];

    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: this.config.get('CF_BUCKET_NAME'),
          Key: filePathname,
        }),
      );

      return { msg: 'Image Deleted Successfully' };
    } catch (error) {
      throw new Error('Failed To Delete Image');
    }
  }
}
