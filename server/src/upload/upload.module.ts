import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { AwsSdkModule } from 'aws-sdk-v3-nest';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  imports: [
    AwsSdkModule.register({
      client: new S3Client({
        region: 'auto',
        endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: process.env.CF_ACCESS_KEY_ID,
          secretAccessKey: process.env.CF_SECRET_ACCESS_KEY,
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
