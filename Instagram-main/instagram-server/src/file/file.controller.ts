import {
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/ })]
      })
    )
    file: Express.Multer.File
  ) {
    return await this.fileService.uploadFile(file);
  }

  @Post('uploads')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/ })]
      })
    )
    files: Array<Express.Multer.File>
  ) {
    return await this.fileService.uploadMultipleFiles(files);
  }
}
