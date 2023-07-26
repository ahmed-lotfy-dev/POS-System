import { PutObjectCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 } from "uuid"

@Injectable()
export class UploadService {
  constructor(config: ConfigService) { }

  async uploadImage(s3: S3Client, image: Express.Multer.File) {
    const id = v4()
    console.log(image);
    if (!image) throw new Error("No Image Provided")
    try {
      const uploadedImage = await s3.send(
        new PutObjectCommand({
          Bucket: 'pos-system',
          Key: `${id}-${image.originalname}`,
          Body: image.buffer,
          ContentType: image.mimetype,
          ACL: 'public-read', // Add this line to set the ACL
        }),
      );
      const imageUrl = `${process.env.CF_IMAGES_SUBDOMAIN}/${id}-${image.originalname}`;

      console.log(imageUrl);

      console.log(uploadedImage);

      return { image: imageUrl };
    } catch (error) {
      throw new Error("Failed To Upload Image")
    }
  }

  async deleteImage(s3: S3Client, dto: { image: string }) {
    const image = dto.image
    console.log(image);
    if (!image) throw new Error("No Image Provided")
    const filePathname = image.split(process.env.CF_IMAGES_SUBDOMAIN)[1]

    console.log(filePathname)
    try {
      const deletedImage = await s3.send(
        new DeleteObjectCommand({
          Bucket: 'pos-system',
          Key: filePathname
        }),
      );
      console.log(deletedImage);

      return { msg: "Image Deleted Successfully" };
    } catch (error) {
      throw new Error("Failed To Delete Image")
    }
  }
}
