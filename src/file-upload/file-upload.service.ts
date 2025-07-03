import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { Request,Express } from 'express';
// import { File as MulterFile } from 'multer';

@Injectable()
export class FileUploadService {
  private readonly uploadPath = join(__dirname, '..', '..', 'uploads');

  constructor() {
    this.createUploadFolder();
  }

  private async createUploadFolder() {
    try {
      await fs.mkdir(this.uploadPath, { recursive: true });
    } catch (error) {
      console.error('Error creating upload folder:', error);
    }
  }
  // async uploadFile(file: MulterFile): Promise<{ filename: string; size: number; uploadDate: Date }> {
  async uploadFile(file: Express.Multer.File, user: any): Promise<{ filename: string; size: number; uploadDate: Date }> {
    const userFolder = join(this.uploadPath, user.email.toString());
    await fs.mkdir(userFolder, { recursive: true });
    const filePath = join(userFolder, file.originalname);
    await fs.writeFile(filePath, file.buffer);
    return {
      filename: file.originalname,
      size: file.size,
      uploadDate: new Date(),
    };
  }
}