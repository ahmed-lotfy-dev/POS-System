import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  constructor(config: ConfigService) {}

  async uploadProductImage(s3: S3Client, image: Express.Multer.File) {
    console.log(image);
    const uploadedImage = await s3.send(
      new PutObjectCommand({
        Bucket: 'pos-system',
        Key: image.originalname,
        Body: image.buffer,
        ContentType: image.mimetype,
        ACL: 'public-read', // Add this line to set the ACL
      }),
    );
    const imageUrl = `${process.env.CF_IMAGES_SUBDOMAIN}/${image.originalname}`;

    console.log(imageUrl);

    console.log(uploadedImage);

    return { image: imageUrl };
  }
}
