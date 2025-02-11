import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

export class FileService {
  constructor(private configService: ConfigService) {}

  bucketName = process.env.AWS_BUCKET;
  s3 = new S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION
  });

  async uploadFile(file: Express.Multer.File) {
    const { originalname } = file;
    return await this.s3_upload(file.buffer, this.bucketName, originalname, file.mimetype);
  }

  async s3_upload(dataBuffer: Buffer, bucket: string, name: string, mimetype: string) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: dataBuffer,
      ContentType: mimetype,
      ContentDisposition: 'inline'
    };
    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }

  async uploadMultipleFiles(files: Array<Express.Multer.File>) {
    const response = [];
    for (const file of files) {
      response.push(await this.s3_upload(file.buffer, this.bucketName, file.originalname, file.mimetype));
    }
    return response;
  }
}
