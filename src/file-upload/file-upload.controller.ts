import { Controller, Post, UseInterceptors, UploadedFile, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  async uploadFile(@UploadedFile() file: Express.Multer.File,@Request() req) {
    console.log(req?.user)
    return this.fileUploadService.uploadFile(file,req?.user);
  }
  }
